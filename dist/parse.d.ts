import Joi from 'joi';
import { TypeContent, Settings } from './types';
export declare const supportedJoiTypes: string[];
export interface BaseDescribe extends Joi.Description {
    flags?: {
        label?: string;
        description?: string;
        presence?: 'optional' | 'required';
        unknown?: boolean;
    };
}
export interface ArrayDescribe extends BaseDescribe {
    type: 'array';
    items: Describe[];
}
export interface ObjectDescribe extends BaseDescribe {
    type: 'object';
    keys: Record<'string', Describe>;
}
export interface AlternativesDescribe extends BaseDescribe {
    type: 'alternatives';
    matches: {
        schema: Describe;
    }[];
}
export interface StringDescribe extends BaseDescribe {
    type: 'string';
    allow?: string[];
}
export interface BasicDescribe extends BaseDescribe {
    type: 'any' | 'boolean' | 'date' | 'number';
}
export declare type Describe = ArrayDescribe | BasicDescribe | ObjectDescribe | AlternativesDescribe | StringDescribe;
export declare function getAllCustomTypes(parsedSchema: TypeContent): string[];
export declare function typeContentToTs(settings: Settings, parsedSchema: TypeContent, doExport?: boolean): string;
/**
 * Parses a joi schema into a TypeContent
 * @param details: the joi schema
 * @param Settings: settings used for parsing
 * @param useLabels if true and if a schema has a label we won't parse it and instead just reference the label in the outputted type
 * @param ignoreLabels a list a label to ignore if found. Sometimes nested joi schemas will inherit the parents label so we want to ignore that
 */
export declare function parseSchema(details: Describe, settings: Settings, useLabels?: boolean, ignoreLabels?: string[]): TypeContent | undefined;
//# sourceMappingURL=parse.d.ts.map