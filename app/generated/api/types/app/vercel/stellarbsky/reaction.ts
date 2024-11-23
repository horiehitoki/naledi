/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'

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
    (v.$type === 'app.vercel.stellarbsky.reaction#main' ||
      v.$type === 'app.vercel.stellarbsky.reaction')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.stellarbsky.reaction#main', v)
}
