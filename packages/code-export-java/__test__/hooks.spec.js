// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import hooks from '../src/hooks'

describe('emitted test hooks', () => {
  it('should register new entries', () => {
    Object.keys(hooks).forEach(hook => {
      const input = 'blahblahblah'
      hooks[hook].register(input)
      expect(hooks[hook].emit().includes(input)).toBeTruthy()
    })
  })
  it('should clear new entries', () => {
    Object.keys(hooks).forEach(hook => {
      const input = 'blahblahblah'
      hooks[hook].register(input)
      hooks[hook].clear()
      expect(hooks[hook].emit().includes(input)).toBeFalsy()
    })
  })
  it('method declaration should not register duplicates', () => {
    hooks.methods.register('blah', ['blah', 'blah', 'blah'])
    hooks.methods.register('blah', ['blah', 'blah', 'blah'])
    const output = `
    public void blah() {
    \tblah
    \tblah
    \tblah
    }`
    expect(hooks.methods.emit()).toMatch(output)
  })
})
