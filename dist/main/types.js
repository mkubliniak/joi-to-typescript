"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTypeContentRoot = exports.makeTypeContentChild = exports.InputFileFilter = void 0;
class InputFileFilter {
}
exports.InputFileFilter = InputFileFilter;
/**
 * *.ts files
 */
InputFileFilter.Default = new RegExp(/\.(ts)$/);
/**
 * *.ts files excluding index.ts files
 */
InputFileFilter.ExcludeIndex = new RegExp(/(?<!index)\.(ts)$/);
/**
 * *.ts and *.js files
 */
InputFileFilter.IncludeJavaScript = new RegExp(/\.(ts|js)$/);
function makeTypeContentChild({ content, customTypes, required, isReadonly, interfaceOrTypeName, jsDoc }) {
    return {
        __isRoot: false,
        content,
        customTypes,
        required,
        interfaceOrTypeName,
        isReadonly,
        jsDoc
    };
}
exports.makeTypeContentChild = makeTypeContentChild;
function makeTypeContentRoot({ joinOperation, interfaceOrTypeName, children, required, isReadonly, jsDoc }) {
    return {
        __isRoot: true,
        joinOperation,
        interfaceOrTypeName,
        children,
        required,
        isReadonly,
        jsDoc
    };
}
exports.makeTypeContentRoot = makeTypeContentRoot;