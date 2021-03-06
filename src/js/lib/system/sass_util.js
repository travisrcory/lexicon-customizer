'use strict';

import _ from 'lodash';
import fs from 'fs';
import fsp from 'fs-promise';
import path from 'path';
import sass from 'node-sass';

import * as componentScraper from './component_scraper';
import * as varUtil from '../var_util';

const CWD = process.cwd();

const PATH_BOWER_INCLUDES = path.join(CWD, 'bower_components/bourbon/app/assets/stylesheets');

const PATH_CUSTOM_VARIABLES = path.join(CWD, 'lexicon/_custom_variables.scss');

const PATH_LEXICON_SCSS = path.join(CWD, 'lexicon/src/scss');

export function clearCustomVariablesFile(variables, themePath) {
	if (themePath) {
		clearModifiedVariablesFromTheme(variables, themePath);
	}

	return fsp.writeFile(PATH_CUSTOM_VARIABLES, '');
};

export function clearModifiedVariablesFromTheme(variables, themePath) {
	_clearModifiedVariablesFromFile(variables, _getThemeVariablesFileAbsolutePath(themePath));
};

export function render(options, filePath, cb) {
	options = _.defaults({
		file: filePath,
		includePaths: [PATH_BOWER_INCLUDES, PATH_LEXICON_SCSS]
	}, options);

	sass.render(options, cb);
};

export const renderLexiconBase = _.debounce(renderLexiconBaseTask, 300);

export function renderLexiconBaseTask(options, cb) {
	if (!cb) {
		cb = options;
		options = {};
	}

	let baseLexiconTheme = _.kebabCase(options.baseLexiconTheme || 'lexiconBase');

	options = _.omit(options, 'baseLexiconTheme');

	render(options, path.join(CWD, 'lexicon', baseLexiconTheme + '.scss'), function(err, result) {
		let filePath;

		if (!err) {
			let cssString = result.css.toString();

			filePath = path.join(CWD, 'lexicon/build', baseLexiconTheme + '.css');

			fs.writeFileSync(filePath, cssString);
		}

		cb(err, filePath);
	});
};

export function writeCustomVariablesFile(variables, sourceVariables, themePath) {
	let variablesString = _getModifiedVariablesString(variables, sourceVariables);

	if (themePath) {
		_writeThemeFileTask(variables, variablesString, themePath);
	}

	return fsp.writeFile(path.join(CWD, 'lexicon/_custom_variables.scss'), variablesString);
};

export function _clearModifiedVariablesFromFile(variables, filePath) {
	let themeVariables = _getThemeVariables(variables, filePath);

	return fsp.writeFile(filePath, _generateVariablesString(themeVariables));
};

export function _getModifiedVariablesString(variables, sourceVariables) {
	let modifiedVariables = varUtil.getModifiedVariables(variables, sourceVariables);

	return _generateVariablesString(modifiedVariables);
};

export function _getThemeVariables(variables, filePath) {
	let fileVariables = componentScraper.mapVariablesFromFile(filePath);

	return fileVariables.filter((variable, key) => {
		return !variables.has(key);
	});
};

export function _generateVariablesString(modifiedVariables) {
	return modifiedVariables.toArray().map((variable, index) => {
		return variable.get('name') + ': ' + variable.get('value') + ';\n'
	}).join('');
};

export function _getThemeVariablesFileAbsolutePath(themePath) {
	return path.join(themePath, 'src/css/_aui_variables.scss');
};

export function _writeThemeFile(variables, variablesString, themePath) {
	let themeVariables = _getThemeVariables(variables, _getThemeVariablesFileAbsolutePath(themePath));

	variablesString = variablesString + '\n' + _generateVariablesString(themeVariables);

	fsp.writeFile(path.join(themePath, 'src/css/_aui_variables.scss'), variablesString);
}

export const _writeThemeFileTask = _.debounce(_writeThemeFile, 100);

export {sass};
