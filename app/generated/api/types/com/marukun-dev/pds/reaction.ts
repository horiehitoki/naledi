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
  createdAt: string
  emoji: string
  postedBy: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'com.marukun-dev.pds.reaction#main' ||
      v.$type === 'com.marukun-dev.pds.reaction')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('com.marukun-dev.pds.reaction#main', v)
}
