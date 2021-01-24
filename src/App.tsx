import React, { useState, useCallback, useEffect} from 'react'
import "./styles.css";
import { SearchBar } from "./components/SearchBar";
import { useSelector, shallowEqual } from "react-redux"
import { Dispatch } from "redux";
import { useDispatch } from "react-redux"
import { getUsers } from "./store/actionCreators";

const useKeyPress = function(targetKey:string) {
	const [keyPressed, setKeyPressed] = useState(false);
 
	const downHandler = (event:any) => {
		const {key} = event
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = (event:any) => {
		const {key} = event
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);
		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	});

	return keyPressed;
};

const App: React.FC = () => {
	const dispatch: Dispatch<any> = useDispatch();
	const users: readonly uList[] = useSelector(
		(state: UsersState) => state.users,
		shallowEqual
	);
	const [userArr, setUserArr] = useState(users)
	const [searchInput, setSearchInput] = useState('')
	const downPress = useKeyPress("ArrowDown");
	const upPress = useKeyPress("ArrowUp");
	const [cursor, setCursor] = useState(0);

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	useEffect(() => {
		if (userArr.length && downPress) {
			setCursor(prevState =>
				prevState < userArr.length - 1 ? prevState + 1 : prevState
			);
		}
	}, [downPress, userArr]);

	useEffect(() => {
		if (userArr.length && upPress) {
			setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
		}
	}, [upPress, userArr]);

	useEffect(() => {
		setUserArr(users)
	}, [users])

	const rowHover = (index:number) =>{
		setCursor(index)
	}

	const renderData = useCallback(() => {
		if(!userArr.length) return (<tr><td style={{textAlign:'center'}} colSpan={8}>No records</td></tr>)
		return userArr.map((val, index) => {
			const { id, name, username, email, address, phone, website, company} = val //destructuring
			return (
				<tr {...index===cursor?{id:'highlight'}:{}} key={index} onMouseEnter={()=>rowHover(index)}>
					<td>{id}</td>
					<td>{name}</td>
					<td>{username}</td>
					<td><a href={"mailto:" + email}>{email}</a></td>
					<td><pre>{JSON.stringify(address, null, '\t')}</pre></td>
					<td><a href={"tel:" + phone}>{phone}</a></td>
					<td>{website}</td>
					<td><pre>{JSON.stringify(company, null, '\t')}</pre></td>
				</tr>
			)
		})
	}, [userArr, cursor])

	const search = (input:any) =>{
		setSearchInput(input);
		if(!users.length) return
		const filterUser =  users.filter((o:any) =>{
			return Object.keys(o).some(k => {
				if(typeof o[k] === 'object') {
					const subObj = o[k]
					return Object.keys(subObj).some(j => {
						return subObj[j].toString().toLowerCase().includes(input.toLowerCase())
					})
				}else{
					return o[k].toString().toLowerCase().includes(input.toLowerCase())
				}
			})
		})
		setUserArr(filterUser);
	}

	return (
		<main>
			<h1>Users</h1>
      
			<SearchBar 
				searchText={searchInput} 
				onSearchChange={search}
			/>

			<div className='userstable'>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>USERNAME</th>
							<th>EMAIL</th>
							<th>ADDRESS</th>
							<th>PHONE</th>
							<th>WEBSITE</th>
							<th>COMPANY</th>
						</tr>
					</thead>
					<tbody>
						{renderData()}
					</tbody>
				</table>
			</div>
		</main>
	);
};

export default App;
