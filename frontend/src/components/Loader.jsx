import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
const Loader = () => {
    return (
        <div>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </div>
    );
};

export default Loader;
