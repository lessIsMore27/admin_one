import React from "react";
import { Layout, Menu } from "antd";
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';
import ss from "./index.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const menuList = [
	{
		"id": 46,
		"route": null,
		"label": "系统设置",
		"parameter": "[]",
		"parent_id": 2,
		"interface_id": null,
		"icon": "setting",
		"children": [
			{
				"id": 90,
				"route": "users/list",
				"label": "用户列表",
				"parameter": "[]",
				"parent_id": 46,
				"interface_id": 88,
				"icon": "setting",
				"children": []
			},
			{
				"id": 180,
				"route": "operation/list",
				"label": "操作记录",
				"parameter": "[]",
				"parent_id": 46,
				"interface_id": 146,
				"icon": "setting",
				"children": []
			},
			{
				"id": 51,
				"route": "role/list",
				"label": "角色管理",
				"parameter": "[]",
				"parent_id": 46,
				"interface_id": 50,
				"icon": "setting",
				"children": []
			},
			{
				"id": 47,
				"route": "menu/list",
				"label": "菜单管理",
				"parameter": "[]",
				"parent_id": 46,
				"interface_id": 45,
				"icon": "setting",
				"children": []
			}
		]
	}
];

interface SidebarState {
	collapsed: boolean;	
}

export default class Sidebar extends React.Component<{}, SidebarState> {
	constructor(props: any) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	onCollapse = (collapsed: any) => {
		this.setState({ collapsed });
	};

	renderMenu = (menuData: any) => {
		return menuData.map((item: any) => {
			if (item.children.length > 0) {
				return (
					<SubMenu
						key={item.id}
						title={
							<React.Fragment>
								<Icon type={item.icon} />
								<span>{item.label}</span>
							</React.Fragment>
						}
					>
						{this.renderMenu(item.children)}
					</SubMenu>
				)
			} else {
				return <Menu.Item key={`/${item.route}`}>
					<Link to={`/${item.route}`}>{item.label}</Link>
				</Menu.Item>
			}
		})
	}

	render() {
		const { collapsed } = this.state;
		return (
			<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
				<div className={ss.logo} />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					{this.renderMenu(menuList)}
				</Menu>
			</Sider>
		);
	}
}
