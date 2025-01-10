/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../atproto/repo/strongRef'

export interface Record {
  subject: ComAtprotoRepoStrongRef.Main
  emoji: EmojiRef
  authorDid: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'com.marukun-dev.stellar.reaction#main' ||
      v.$type === 'com.marukun-dev.stellar.reaction')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('com.marukun-dev.stellar.reaction#main', v)
}

export interface EmojiRef {
  rkey: string
  repo: string
  [k: string]: unknown
}

export function isEmojiRef(v: unknown): v is EmojiRef {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'com.marukun-dev.stellar.reaction#emojiRef'
  )
}

export function validateEmojiRef(v: unknown): ValidationResult {
  return lexicons.validate('com.marukun-dev.stellar.reaction#emojiRef', v)
}
