import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { RouteConfig } from 'vue-router';
import { asyncRoutes, constantRoutes } from '@/router';
import store from '@/store';
import { SimpleDeepCopy } from '@/utils/util';

// 将后台树菜单转换为一维数组
const loopTranformRouter = (resRouter: any[] = []) => {
  let newRouter: any[] = [];
  resRouter.forEach(item => {
    const tmp = SimpleDeepCopy(item);
    if (tmp.childrenList && tmp.childrenList.length > 0) {
      const noChildTmp = SimpleDeepCopy(tmp);
      delete noChildTmp.childrenList;
      newRouter.push(noChildTmp);
      newRouter = newRouter.concat(loopTranformRouter(tmp.childrenList));
    } else {
      newRouter.push(tmp); // 将整个对象传入
    }
  });
  return newRouter;
};
// 筛选权限路由
const filterAsyncRoutes = (asyncRoutes: RouteConfig[], resRoutes: any[]) => {
  const res: RouteConfig[] = [];
  asyncRoutes.forEach(route => {
    const tmp: RouteConfig = SimpleDeepCopy(route);
    // 首层路由直接加入
    const targetRoute: any = resRoutes.find(r => r.path === route.path);
    if (!!targetRoute) {
      // 后台存在此路由(merge(后台路由，本地路由),合并到meta中)
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, resRoutes);
      }
      const tempMeta = { ...tmp.meta, ...targetRoute };
      delete tempMeta.path;
      tmp.meta = tempMeta;
      res.push(tmp);
    } else {
      if (route.path === '/' || (route.meta.auth && route.meta.auth.includes('super-admin'))) {
        // 首页 || auth 为admin    直接加入
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, resRoutes);
        }
        res.push(tmp);
      }
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }

  @Action
  public GenerateRoutes(roles: any[]) {
    // const resRoutes = loopTranformRouter(roles);
    // const accessedRoutes = filterAsyncRoutes(asyncRoutes, resRoutes);
    // console.log(resRoutes);
    // console.log(accessedRoutes);
    const accessedRoutes = asyncRoutes;
    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
