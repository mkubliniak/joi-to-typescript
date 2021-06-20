import { existsSync, readFileSync, rmdirSync } from 'fs';
import Joi from 'joi';
import { convertFromDirectory, convertSchema } from '../..';

describe('test the use of .meta({className: ""})', () => {
  const typeOutputDirectory = './src/__tests__/className/interfaces';
  const schemaDirectory = './src/__tests__/className/schemas';

  beforeAll(() => {
    if (existsSync(typeOutputDirectory)) {
      rmdirSync(typeOutputDirectory, { recursive: true });
    }
  });

  test('generate className interfaces', async () => {
    const consoleSpy = jest.spyOn(console, 'debug');
    const result = await convertFromDirectory({
      schemaDirectory,
      typeOutputDirectory,
      debug: true
    });

    expect(result).toBe(true);

    expect(existsSync(`${typeOutputDirectory}/index.ts`)).toBeTruthy();

    expect(consoleSpy).toHaveBeenCalledWith(
      "It is recommended you update the Joi Schema 'noClassNameSchema' similar to: noClassNameSchema = Joi.object().meta({className:'noClassName'})"
    );
  });

  test('no className', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/NoClassNameTest.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface noClassNametest {
  name?: string;
}
`
    );
  });

  // it would be nice to auto remove this schema suffix but that could break the Joi, the safest is to warn the user about
  // how they could do it better
  test('no className with schema as suffix', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/NoClassName.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface noClassNameSchema {
  name?: string;
}
`
    );
  });

  test('className', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/ClassName.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Frank {
  name?: string;
}
`
    );
  });

  test('className property names', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/ClassNameProperty.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export type Name = string;

export interface className {
  name?: Name;
}
`
    );
  });

  test('className property names with spaces', () => {
    const oneContent = readFileSync(`${typeOutputDirectory}/ClassNamePropertySpaced.ts`).toString();

    expect(oneContent).toBe(
      `/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export type CustomerPhoneNumber = string;

export type EmailAddress = string;

export type Name = string;

export interface spacedClassName {
  email?: EmailAddress;
  name?: Name;
  phone?: CustomerPhoneNumber;
}
`
    );
  });

  test('no meta({className:""}) and no property name', () => {
    expect(() => {
      convertSchema(
        {},
        Joi.object({
          name: Joi.string().optional()
        })
      );
    }).toThrowError();
  });
});