import test from "ava"; import "babel-core/register"

import { getItemOrContinue } from "../server"

// fixtures
const item = { __url: "/test/" }
const collection = [ item ]

test("should return item if in collection", (t) => {

  const result = getItemOrContinue(
    collection,

    // req
    { originalUrl: "/test/" },

    // res
    { redirect: () => t.fail },

    // next
    () => t.fail
  )
  t.is(result, item)
})

test("should redirect if missing /", (t) => {
  const result = getItemOrContinue(
    collection,

    // req
    { originalUrl: "/test" },

    // res
    { redirect: () => t.pass },

    // next
    () => t.fail
  )
  if (result) {
    t.fail()
  }
})

test("should skip if not in collection", (t) => {
  const result = getItemOrContinue(
    collection,
    // req
    { originalUrl: "/no" },

    // res
    { redirect: () => t.fail },

    // next
    () => t.pass
  )
  if (result) {
    t.fail()
  }
})