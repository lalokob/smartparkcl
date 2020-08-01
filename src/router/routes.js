
const routes = [
	{ path: '/', redirect:'/launcher' },
	{
		path: '/signin',
		component: () => import('layouts/Signin.vue')
	},
	{
		path: '/launcher',
		component: () => import('layouts/Launcher.vue'),
	},
	{
		path: '/park',
		component: () => import('layouts/Park.vue'),
		children: [
			{ path: '', component: () => import('pages/Park/Index.vue') }
		],
	},
	{
		path: '/cajas',
		component: () => import('layouts/Cashdesk.vue'),
		children: [
			{ path: '', component: () => import('pages/Cashdesk/Index.vue') }
		],
	},

  // Always leave this as last one,
  // but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
