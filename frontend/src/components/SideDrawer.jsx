import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { chatState } from '../Context/ChatProvider';
import { useState } from 'react';
import axios from 'axios';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider
} from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import UserList from './UserList';
import { useToast } from '@chakra-ui/react';
import Loader from './Loader';

const SideDrawer = () => {
    const { user } = chatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loadingChats, setLoadingChats] = useState(false);
    const toast = useToast();

    const handelSearch = async () => {
        if (search.length === 0) {
            toast({
                title: `Search field is empty`,
                status: 'warning',
                isClosable: true
            });
        } else {
            setLoading(true);
            await axios
                .get(
                    `http://localhost:3000/api/user/allusers?search=${search}`,
                    { withCredentials: true }
                )

                .then((response) => {
                    setLoading(false);
                    setSearchResults(response.data.data);
                })
                .catch((error) => {
                    setLoading(false);
                    toast({
                        title: `Something went wrong while searching users`,
                        status: 'error',
                        isClosable: true
                    });
                });
        }
    };

    const handelCloseDrawer = () => {
        setSearch('');
        setSearchResults([]);
        onClose();
    };

    return (
        <>
            <div className=' p-4 w-full h-16 bg-green-600 flex items-center justify-between'>
                <div>
                    <Button
                        className='w-32 text-white'
                        ref={btnRef}
                        colorScheme='teal'
                        onClick={onOpen}>
                        Search Users
                    </Button>
                </div>
                <h1 className='text-2xl '>My Chat App</h1>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                className='w-32'
                                isActive={isOpen}
                                as={Button}>
                                {isOpen ? 'Close' : 'Info'}
                            </MenuButton>

                            <MenuList>
                                <MenuItem>{user.name}</MenuItem>
                                <MenuItem>{user.email}</MenuItem>
                                <MenuItem>{user.username}</MenuItem>
                                <MenuItem onClick={() => alert('Kagebunshin')}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </div>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={handelCloseDrawer}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search Users</DrawerHeader>
                    <DrawerBody>
                        <div className='flex gap-2'>
                            <Input
                                placeholder='Search Here....'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button colorScheme='blue' onClick={handelSearch}>
                                <SearchIcon />
                            </Button>
                        </div>
                        <div>
                            {loading ? (
                                <Loader />
                            ) : (
                                searchResults.map((user) => (
                                    <UserList key={user._id} user={user} />
                                ))
                            )}
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer;
