import { getOptionsFromEnum, toTitleCase } from '../helpers';

import React from 'react';

import { Select } from 'antd';

describe('helpers ', () => {
  describe('toTitleCase', () => {
    it('convert one lowercase word to title', () => {
      expect(toTitleCase('test')).toEqual('Test');
      expect(toTitleCase(' test')).toEqual(' Test');
      expect(toTitleCase('   test')).toEqual('   Test');
      expect(toTitleCase('test ')).toEqual('Test ');
      expect(toTitleCase('test   ')).toEqual('Test   ');
    });

    it('convert one lowercase word to title', () => {
      expect(toTitleCase('TEST')).toEqual('Test');
      expect(toTitleCase(' TEST')).toEqual(' Test');
      expect(toTitleCase('   TEST')).toEqual('   Test');
      expect(toTitleCase('TEST ')).toEqual('Test ');
      expect(toTitleCase('TEST   ')).toEqual('Test   ');
    });

    it('one word title word stays same', () => {
      expect(toTitleCase('Test')).toEqual('Test');
      expect(toTitleCase(' Test')).toEqual(' Test');
      expect(toTitleCase('   Test')).toEqual('   Test');
      expect(toTitleCase('Test ')).toEqual('Test ');
      expect(toTitleCase('Test   ')).toEqual('Test   ');
    });

    it('convert two lowercase words to title', () => {
      expect(toTitleCase('test code')).toEqual('Test Code');
      expect(toTitleCase(' test code')).toEqual(' Test Code');
      expect(toTitleCase('   test code')).toEqual('   Test Code');
      expect(toTitleCase('Test Code ')).toEqual('Test Code ');
      expect(toTitleCase('test code   ')).toEqual('Test Code   ');
    });

    it('convert two uppercase words to title', () => {
      expect(toTitleCase('TEST CODE')).toEqual('Test Code');
      expect(toTitleCase(' TEST CODE')).toEqual(' Test Code');
      expect(toTitleCase('   TEST CODE')).toEqual('   Test Code');
      expect(toTitleCase('TEST CODE ')).toEqual('Test Code ');
      expect(toTitleCase('TEST CODE   ')).toEqual('Test Code   ');
    });

    it('two title words stay the same', () => {
      expect(toTitleCase('Test Code')).toEqual('Test Code');
      expect(toTitleCase(' Test Code')).toEqual(' Test Code');
      expect(toTitleCase('   Test Code')).toEqual('   Test Code');
      expect(toTitleCase('Test Code ')).toEqual('Test Code ');
      expect(toTitleCase('Test Code   ')).toEqual('Test Code   ');
    });
  });

  describe('getOptionsFromEnum', () => {
    it('convert enum to Options JSX', () => {
      enum testEnum {
        FIRST_KEY = 'One',
        SECOND_KEY = 'Two',
      }

      const optionsList = [
        <Select value={'FIRST_KEY'} key={'FIRST_KEY'}>
          First Key
        </Select>,
        <Select value={'SECOND_KEY'} key={'SECOND_KEY'}>
          Second Key
        </Select>,
      ];

      expect(getOptionsFromEnum(testEnum)).toEqual(optionsList);
    });
  });
});
