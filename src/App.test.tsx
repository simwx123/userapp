import React from 'react'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from './teststore'
import App from './App'
import { SearchBar } from "./components/SearchBar";

let wrapper:any
configure({adapter: new Adapter()});

describe('User page', () => {
	const expectedPayload = { type: 'GET_USERS' }
	const usersaction = () => expectedPayload

	it('Users store actions', () => {
		store.dispatch(usersaction())
		const actions = store.getActions()
		expect(actions).toEqual([expectedPayload])
	})

	it('App to be defined', () => {
		wrapper = mount(
			<Provider store={store}>
				<App/>
			</Provider>
		)
		expect(wrapper).toBeDefined()
	})
  
	it('Searchbar components', () => {
		expect(wrapper.find(SearchBar).length).toEqual(1)
	})

	it('should contain two rows', () => {
		expect(wrapper.find(<table/>)).toBeDefined();
		expect(wrapper.find('tbody').find('tr').length).toEqual(2)
	});
})
