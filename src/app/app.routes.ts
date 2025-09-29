import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  {path:'' , redirectTo:"home" , pathMatch:"full"},
  {
     path: "", loadComponent: () => import( "./core/layouts/blank-layout/blank-layout.component" ).then( ( c ) => c.BlankLayoutComponent ),children: [
       {path:'' , redirectTo :'home' , pathMatch:"full"},
      { path: 'brands', loadComponent: () => import( "./features/brands/brands.component" ).then( ( c ) => c.BrandsComponent ), title: 'brands' },
      { path: 'categories', loadComponent: () => import( "./features/categories/categories.component" ).then( ( c ) => c.CategoriesComponent ), title: 'categories' },
      { path: 'cart', loadComponent: () => import( "./features/cart/cart.component" ).then( ( c ) => c.CartComponent ), title: 'cart' , canActivate:[authGuard] },
      { path: 'check-out/:id', loadComponent: () => import( "./features/checkout/checkout.component" ).then( ( c ) => c.CheckoutComponent ), title: 'check out' , canActivate:[authGuard] },
      { path: 'contact-us', loadComponent: () => import( "./features/contact-us/contact-us.component" ).then( ( c ) => c.ContactUsComponent ), title: 'contact us' },
      { path: 'details/:slug/:id', loadComponent: () => import( "./features/details/details.component" ).then( ( c ) => c.DetailsComponent ), title: 'product details' },
      { path: 'details/:id', loadComponent: () => import( "./features/details/details.component" ).then( ( c ) => c.DetailsComponent ), title: 'product details' },
      { path: 'category-products/:id', loadComponent: () => import( "./features/category-products/category-products.component" ).then( ( c ) => c.CategoryProductsComponent ), title: 'shop' },
      { path: 'brand-products/:id', loadComponent: () => import( "./features/brand-products/brand-products.component" ).then( ( c ) => c.BrandProductsComponent ), title: 'shop' },
      { path: 'home', loadComponent: () => import( "./features/home/home.component" ).then( ( c ) => c.HomeComponent ), title: 'home' },
      { path: 'wish-list', loadComponent: () => import( "./features/wish-list/wish-list.component" ).then( ( c ) => c.WishListComponent ), title: 'wish list' , canActivate:[authGuard] },
      { path: 'our-story', loadComponent: () => import( "./features/our-story/our-story.component" ).then( ( c ) => c.OurStoryComponent ), title: 'our story' },
      { path: 'shop', loadComponent: () => import( "./features/shop/shop.component" ).then( ( c ) => c.ShopComponent ), title: 'shop' },
      { path: 'allorders', loadComponent: () => import( "./features/all-orders/all-orders.component" ).then( ( c ) => c.AllOrdersComponent ), title: 'All Orders' , canActivate:[authGuard] },
      { path: 'cash-order', loadComponent: () => import( "./features/cash-order/cash-order.component" ).then( ( c ) => c.CashOrderComponent ), title: 'your order' },
    ]
  },
  {

    path: "", loadComponent: () => import( './core/layouts/auth-layout/auth-layout.component' ).then( ( c ) => c.AuthLayoutComponent ),children: [
      { path: 'login', loadComponent: () => import( "./core/auth/login/login.component" ).then( ( c ) => c.LoginComponent ), title: "login", canActivate: [ isLoggedGuard ] },
    {path:'forget-password' , loadComponent:()=>import("./core/auth/forget-password/forget-password.component").then((c)=>c.ForgetPasswordComponent) , title:"forget password" , canActivate:[isLoggedGuard]},
    {path:'register' , loadComponent:()=>import("./core/auth/register/register.component").then((c)=>c.RegisterComponent) , title:"register" ,  canActivate:[isLoggedGuard]},
  ]},
  {path:"**" , loadComponent:()=>import("./features/notfound/notfound.component").then((c)=>c.NotfoundComponent)}
];


