import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/system';

const ListItemSkeletonContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px',
});

const CheckboxSkeleton = styled(Skeleton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const TextSkeleton = styled(Skeleton)(({ theme }) => ({
    flex: 1,
    marginRight: theme.spacing(2),
}));

const IconSkeleton = styled(Skeleton)({
    width: 30,
    height: 30,
});

const ListItemSkeleton = () => {
    return (
        <ListItemSkeletonContainer>
            <CheckboxSkeleton variant="circular" width={20} height={20} />
            <TextSkeleton variant="text" width="50%" height={20} />
            <TextSkeleton variant="text" width="80%" height={20} />
            <IconSkeleton variant="circular" width={30} height={30} />
        </ListItemSkeletonContainer>
    );
};

export default ListItemSkeleton;