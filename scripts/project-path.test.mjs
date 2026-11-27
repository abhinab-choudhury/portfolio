import test from 'node:test'
import assert from 'node:assert/strict'
import {projectPath} from '../apps/web/src/lib/project-path.ts'

test('published slugs produce readable detail URLs', () => {
  assert.equal(projectPath({_id: 'abc', project_title: 'My Project', slug: 'my-project'}), '/project/my-project')
})
test('legacy projects remain addressable and duplicate titles stay distinct', () => {
  assert.equal(projectPath({_id: 'abc', project_title: 'My Project!'}), '/project/my-project--abc')
  assert.notEqual(projectPath({_id: 'abc', project_title: 'Same'}), projectPath({_id: 'def', project_title: 'Same'}))
})
test('non-Latin titles without slugs have a valid fallback', () => {
  assert.equal(projectPath({_id: 'abc', project_title: '日本語'}), '/project/project--abc')
})
