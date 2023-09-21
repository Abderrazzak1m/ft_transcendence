
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {userDto} from "@/dto/userDto";
import channelDto from "@/dto/channelDto";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";


interface Data{
    id: number;
    name: string;
    image: string;
    type: string;
    password: string;

}


const ChannelItems = ({path}:{path:string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const data1 :channelDto[] = useSelector((state: any) => state.globalState.channels);
    const user = useSelector((state: any) => state.globalState.user);
    return (
        
        <div className="h-[90%] overflow-y-scroll py-2 ">
            {
                data1.map((data: channelDto) =>(
                    <Link  key={data.id} href={`/channel/${data.id}` }>
                        <ChannelItem channel={data} user={user} />
                    </Link>
                ))
        
            }
        </div>
    );
}
 
export default ChannelItems;

export const ChannelItem = ({channel, user}:{channel:any , user:userDto}) => { 
    const dispatch: AppDispatch = useDispatch();
    const [isMember, setIsMember] = useState(false);
    const channels = useSelector((state: any) => state.globalState.channels);
   
    useEffect(() => {
            function ss(member: any) {
                return (member.member?.username === user.username);
           }
           channel.memberships?.find(ss)?.member ? setIsMember(true) : setIsMember(false);
    }, [channels]);

    return (
        <div className={`bg-white bg-opacity-20 ackdrop-blur-lg drop-shadow-lg h-fit px-4 py-2 my-1 mx-2 rounded-xl text-white flex justify-between`}>
            <div className="flex items-center space-x-5">
                <Image
                className="w-10 h-10 rounded-full self-center"
                src={channel.image}
                width={100}
                height={100}
                alt=""
                />
                <h3>{channel.name}</h3>
            </div>
            <div className={`${isMember === false ? 'flex flex-row': 'hidden'} `}>
                <Image
                className={`w-7 h-7  self-center px-1  ${channel.type === "Protected" ? '': 'hidden'} `}
                src={'/img/lock.svg'}
                width={1000}
                height={1000}
                alt=""
                />
               <Image
                className="w-7 h-7  self-center px-1"
                src={'/img/join.svg'}
                width={1000}
                height={1000}
                alt=""
                />
            </div>
        </div>
    );
}
 

