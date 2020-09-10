import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'vue-router';
import { Message, Notification } from 'element-ui';
import { getToken } from '@/utils/storage';
import { UserModule } from '@/store/modules/user';
import { PermissionModule } from '@/store/modules/permission';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start();
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      if (UserModule.roles.length === 0) {
        try {
          await UserModule.GetUserInfo();
          const roles = UserModule.roles;
          PermissionModule.GenerateRoutes(roles);
          router.addRoutes(PermissionModule.dynamicRoutes);
          next({ ...to, replace: true });
        } catch (err) {
          UserModule.ResetToken();
          Message.error(err || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        if (from.path === '/login') {
          Notification.success({ title: '欢迎', message: '欢迎回来' });
        }
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  NProgress.done();
});
