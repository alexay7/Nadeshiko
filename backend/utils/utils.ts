import url from "url";
import {Request, Response } from "express";
import {Send, Query, ParamsDictionary} from "express-serve-static-core";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import {CategoryType} from "../models/media/media";

const PROTOCOL = (process.env.ENVIRONMENT === "production") ? "https" : "http";
export const getBaseUrlMedia = () => {
    return url.format({
        protocol: PROTOCOL,
        host: process.env["BASE_URL_MEDIA"]
    });
}

export const getBaseUrlTmp = () => {
    return url.format({
        protocol: PROTOCOL,
        host: process.env["BASE_URL_TMP"]
    });
}

export const generateApiKey = () => {
    return uuidv4();
}

export const generateApiKeyHint = (apiKey: string) => {
    const visibleCharacters = 4;
    const maskedSection = '*'.repeat(10);
    return `${apiKey.substring(0, visibleCharacters)}${maskedSection}${apiKey.substring(apiKey.length - visibleCharacters)}`;
}

export const hashApiKey = (apiKey: string) => {
    const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
    return hashedKey;
}

// Reference: https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
export interface ControllerRequest<ReqBody, ReqQuery extends Query = Query> extends Request<ParamsDictionary, any, ReqBody, ReqQuery> {}

export interface ControllerResponse<T> extends Response {
    json: Send<T, this>;
}

// https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    if (value === null || value === undefined) return false;
    const testDummy: TValue = value;
    return true;
}

export function getLocationByCatId(catId:CategoryType):string{
    switch(catId){
        case CategoryType.ANIME:
            return "anime";
        case CategoryType.JDRAMA:
            return "jdrama";
        case CategoryType.GAME:
            return "game";
        case CategoryType.BOOK:
            return "book";
        default:
            return "anime";
    }
}

export function getCatIdByLocation(location:string):CategoryType{
    switch(location){
        case "anime":
            return CategoryType.ANIME;
        case "jdrama":
            return CategoryType.JDRAMA;
        case "game":
            return CategoryType.GAME;
        case "book":
            return CategoryType.BOOK;
        default:
            return CategoryType.ANIME;
    }
}