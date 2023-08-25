"use client";
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { userDto } from '@/dto/userDto';
import Link from 'next/link';
import Image from 'next/image';
import Bar from '@/components/common/SearchBar';
import useCloseOutSide from '@/hookes/useCloseOutSide';


const User = ({ user }: { user: userDto }) => {
  return (
    <div className="flex items-center gap-4 bg-dark-gray px-4 py-2 rounded-xl">
      <Image className="sm:w-[48px] sm:h-[48px] rounded-full self-center" src={user.image} width={36} height={36} alt="user image" />
      <h3 className="text-[12px] sm:text-[24px]">{user.name}</h3>
    </div>
  )
}

const SearchBarDropDown = ({users}: {users: any}) => {

  return (
      <div 
      className='absolute top-11 w-52 sm:w-72 max-h-56 bg-light-gray rbg-light-gray p-4 flex flex-col gap-1 overflow-y-scroll rounded-2xl'>
      {
        users.data?.users?.length === 0 ? <p className="text-center">No user found</p> :
        users.data?.users?.map((user: userDto) => (
          <Link  href={`/profile/${user.name}`}>
            <User user={user} />
          </Link>
        ))
      }
    </div>
  )
}

const GlobalSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {divref} = useCloseOutSide({setIsOpen});

  const users = useQuery({
    queryKey: ['search', search],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8000/users/search/${search}`, { withCredentials: true });
      console.log(data);
      return data;
    }
  });

  return (
    <div 
      ref={divref}
      className='md:block relative'>
        <Bar setIsOpen={setIsOpen} setSearchValue={setSearch} />
        { users.isloading && 
                            <p>loading...</p>
        }
        {
          isOpen && (search.length != 0) &&  
                                          <SearchBarDropDown users={users}/>
        }
    </div>
  )
}

export default GlobalSearch;