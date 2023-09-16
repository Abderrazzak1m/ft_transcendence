"use client";
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from '@/apis/axios';
import { userDto } from '@/dto/userDto';
import Link from 'next/link';
import Image from 'next/image';
import Bar from '@/components/common/SearchBar';
import useCloseOutSide from '@/hookes/useCloseOutSide';

const User = ({ user }: { user: userDto }) => {
  return (
    <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white bg-opacity-20 ackdrop-blur-lg drop-shadow-lg ">
      <Image className="sm:w-[48px] sm:h-[48px] rounded-full self-center" src={user.image} width={36} height={36} alt="user image" />
      <h3 className="text-balck text-[12px] sm:text-[24px]">{user.username}</h3>
    </div>
  )
}

const SearchBarDropDown = ({search} : {search : string}) => {
  
  const users = useQuery({
    queryKey: ['search', search],
    queryFn: async () => {
      const { data } = await axios.get(`/users/search/${search}`);
      return data;
    }
  });

  if (users.isloading) 
    return (<p>loading...</p>)
  return (
      <div 
      className='absolute top-11 w-52 sm:w-72 max-h-56  p-4 flex flex-col gap-1 overflow-y-scroll rounded-2xl bg-black bg-opacity-20 ackdrop-blur-lg drop-shadow-lg'>
      {
        users.data?.users?.length === 0 ? <p className="text-center">No user found</p> :
        users.data?.users?.map((user: userDto) => (
          <Link  href={`/profile/${user.username}`}>
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

  return (
    <div 
      ref={divref}
      className='md:block relative'>
        <Bar setIsOpen={setIsOpen} setSearchValue={setSearch} />
        {
          isOpen && (search.length != 0) &&  
                                          <SearchBarDropDown search={search}/>
        }
    </div>
  )
}

export default GlobalSearch;