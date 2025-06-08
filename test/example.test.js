import test from 'tape'
import { tappr } from '../lib/tappr.js'

test('should load homepage', tappr(async t => {
  await t.goto('https://example.com')

  t.ok(await t.exists('h1'), 'found <h1> on homepage')
}))
