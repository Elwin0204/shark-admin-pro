import { transformRawRoutesToVueRoutes } from "./transform";
import constantRoutes from "./constant.route";
import asyncRoutes from "./async.route";
import { RouteRecordRaw } from "vue-router";

export function createConstantRoutes() {
  return transformRawRoutesToVueRoutes(constantRoutes as RouteRecordRaw[]);
}

export function createAsyncRoutes() {
  return transformRawRoutesToVueRoutes(asyncRoutes as RouteRecordRaw[]);
}
