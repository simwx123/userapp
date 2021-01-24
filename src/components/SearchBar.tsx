import React from 'react';

type Props = {
  searchText: string;
  onSearchChange: any;
};

export const SearchBar: React.FC<Props> = ({ searchText, onSearchChange }) => {
  const searchStyle = {width:"17rem",background:"#F2F1F9", padding:"0.7rem", borderRadius: 10, border: "1px solid skyblue"};
  return (
    <input 
     style={searchStyle}
     key="userkey"
     value={searchText}
     placeholder={"Search users..."}
     onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
