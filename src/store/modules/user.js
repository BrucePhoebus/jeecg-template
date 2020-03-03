import Vue from 'vue'
import { login, logout, phoneLogin } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO, USER_AUTH, SYS_BUTTON_AUTH } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { queryPermissionsByUser } from '@/api/api'
import { getAction } from '@/api/manage'

const user = {
	state: {
		token: '',
		username: '',
		realname: '',
		welcome: '',
		avatar: '',
		permissionList: [],
		info: {}
	},
	
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, {username, realname, welcome}) => {
			state.username = username
			state.realname = realname
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_PERMISSIONLIST: (state, permissionList) => {
			state.permissionList = permissionList
		},
		SET_INFO: (state, info) => {
			state.info = info
		},
	},
	
	actions: {
		/*
		* CAS验证登录
		* */
		ValidateLogin ({commit}, userInfo) {
			return new Promise((resolve, reject) => {
				getAction('/cas/client/validateLogin', userInfo).then(response => {
					console.log('----cas 登录--------', response)
					if (response.success) {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {username: userInfo.username, realname: userInfo.realname, welcome: welcome()})
						commit('SET_AVATAR', userInfo.avatar)
						resolve(response)
					} else {
						resolve(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		/*
		* 账号密码登录
		* */
		Login ({commit}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(response => {
					if (response.code == '200') {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {username: userInfo.username, realname: userInfo.realname, welcome: welcome()})
						commit('SET_AVATAR', '/avatar2')
						resolve(response)
					} else {
						reject(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		/*
		* 手机号登录
		* */
		PhoneLogin ({commit}, userInfo) {
			return new Promise((resolve, reject) => {
				phoneLogin(userInfo).then(response => {
					if (response.code == '200') {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {username: userInfo.username, realname: userInfo.realname, welcome: welcome()})
						commit('SET_AVATAR', userInfo.avatar)
						resolve(response)
					} else {
						reject(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		GetPermissionList ({commit}) {
			return new Promise((resolve, reject) => {
				let v_token = Vue.ls.get(ACCESS_TOKEN)
				let params = {token: v_token}
				const response = {
					result: {
						menu: [
							{
								"redirect": null,
								"path": "/dashboard/analysis",
								"component": "dashboard/Analysis",
								"route": "1",
								"meta": {
									"keepAlive": false,
									"internalOrExternal": false,
									"icon": "home",
									"title": "首页"
								},
								"name": "dashboard-analysis",
								"id": "9502685863ab87f0ad1134142788a385"
							},
							{
								"redirect": null,
								"path": "/account",
								"component": "layouts/RouteView",
								"route": "1",
								"hidden": true,
								"children": [
									{
										"path": "/account/center",
										"component": "account/center/Index",
										"route": "1",
										"meta": {
											"keepAlive": false,
											"internalOrExternal": false,
											"title": "个人中心"
										},
										"name": "account-center",
										"id": "d86f58e7ab516d3bc6bfb1fe10585f97"
									},
									{
										"path": "/account/settings/base",
										"component": "account/settings/Index",
										"route": "1",
										"children": [
											{
												"path": "/account/settings/notification",
												"component": "account/settings/Notification",
												"route": "1",
												"meta": {
													"keepAlive": false,
													"internalOrExternal": false,
													"title": "新消息通知"
												},
												"name": "account-settings-notification",
												"id": "fedfbf4420536cacc0218557d263dfea"
											},
											{
												"path": "/account/settings/binding",
												"component": "account/settings/Binding",
												"route": "1",
												"meta": {
													"keepAlive": false,
													"internalOrExternal": false,
													"title": "账户绑定"
												},
												"name": "account-settings-binding",
												"id": "4f66409ef3bbd69c1d80469d6e2a885e"
											},
											{
												"path": "/account/settings/security",
												"component": "account/settings/Security",
												"route": "1",
												"meta": {
													"keepAlive": false,
													"internalOrExternal": false,
													"title": "安全设置"
												},
												"name": "account-settings-security",
												"id": "ec8d607d0156e198b11853760319c646"
											},
											{
												"path": "/account/settings/base",
												"component": "account/settings/BaseSetting",
												"route": "1",
												"hidden": true,
												"meta": {
													"keepAlive": false,
													"internalOrExternal": false,
													"title": "基本设置"
												},
												"name": "account-settings-base",
												"id": "1367a93f2c410b169faa7abcbad2f77c"
											},
											{
												"path": "/account/settings/custom",
												"component": "account/settings/Custom",
												"route": "1",
												"meta": {
													"keepAlive": false,
													"internalOrExternal": false,
													"title": "个性化设置"
												},
												"name": "account-settings-custom",
												"id": "882a73768cfd7f78f3a37584f7299656"
											}
										],
										"meta": {
											"keepAlive": false,
											"internalOrExternal": false,
											"title": "个人设置"
										},
										"name": "account-settings-base",
										"id": "6e73eb3c26099c191bf03852ee1310a1",
										"alwaysShow": true
									},
									{
										"path": "/dashboard/workplace",
										"component": "dashboard/Workplace",
										"route": "1",
										"meta": {
											"keepAlive": false,
											"internalOrExternal": false,
											"title": "工作台"
										},
										"name": "dashboard-workplace",
										"id": "8fb8172747a78756c11916216b8b8066"
									}
								],
								"meta": {
									"keepAlive": false,
									"internalOrExternal": false,
									"icon": "user",
									"title": "个人页"
								},
								"name": "account",
								"id": "717f6bee46f44a3897eca9abd6e2ec44"
							}
						]
					}
				}
				const menuData = response.result.menu
				const authData = []
				const allAuthData = []
				//Vue.ls.set(USER_AUTH,authData);
				sessionStorage.setItem(USER_AUTH, JSON.stringify(authData))
				sessionStorage.setItem(SYS_BUTTON_AUTH, JSON.stringify(allAuthData))
				if (menuData && menuData.length > 0) {
					menuData.forEach((item, index) => {
						if (item['children']) {
							let hasChildrenMenu = item['children'].filter((i) => {
								return !i.hidden || i.hidden == false
							})
							if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
								item['hidden'] = true
							}
						}
					})
					console.log(' menu show json ', menuData)
					commit('SET_PERMISSIONLIST', menuData)
					resolve(response)
				} else {
					reject('getPermissionList: permissions must be a non-null array !')
				}
			})
		},
		
		// 登出
		Logout ({commit, state}) {
			return new Promise((resolve) => {
				let logoutToken = state.token
				commit('SET_TOKEN', '')
				commit('SET_PERMISSIONLIST', [])
				Vue.ls.remove(ACCESS_TOKEN)
				logout(logoutToken).then(() => {
					resolve()
				}).catch(() => {
					resolve()
				})
			})
		},
		
	}
}

export default user
