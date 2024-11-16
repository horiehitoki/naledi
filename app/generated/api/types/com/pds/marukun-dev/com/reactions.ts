/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../../util'
import { lexicons } from '../../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../../atproto/repo/strongRef'

export interface Record {
  subject: ComAtprotoRepoStrongRef.Main
  createdAt: string
  emoji: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'com.pds.marukun-dev.com.reactions#main' ||
      v.$type === 'com.pds.marukun-dev.com.reactions')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('com.pds.marukun-dev.com.reactions#main', v)
}
