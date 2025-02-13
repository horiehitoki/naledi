/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from "@atproto/lexicon";
import { isObj, hasProp } from "../../../../util.js";
import { lexicons } from "../../../../lexicons.js";
import { CID } from "multiformats/cid";
import * as BlueMojiRichtextFacet from "../richtext/facet.js";
import * as ComAtprotoLabelDefs from "../../../com/atproto/label/defs.js";

export interface Record {
  name: string;
  description?: string;
  descriptionFacets?: BlueMojiRichtextFacet.Main[];
  icon?: BlobRef;
  adultOnly: boolean;
  createdAt: string;
  labels?:
    | ComAtprotoLabelDefs.SelfLabels
    | { $type: string; [k: string]: unknown };
  [k: string]: unknown;
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    (v.$type === "blue.moji.packs.pack#main" ||
      v.$type === "blue.moji.packs.pack")
  );
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate("blue.moji.packs.pack#main", v);
}
