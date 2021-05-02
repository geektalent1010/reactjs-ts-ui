// Copyright (c) 2021 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            '&.inprogress': {
                position: 'relative',
            },
        },
        gridList: {
            padding: '10px 10px',
            overflowY: 'hidden',
        },
        icon: {
            color: '#ffffffcf',
        },
        header: {
            padding: '10px 0',
            textAlign: 'center',
        },
        uploadInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
        inprogress: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#ffffff82',
            zIndex: 2,
        },
        titleBar: {
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        tile: {
            borderRadius: 8,
            border: '1px solid #0000001a',
        },
        tileHeader: {
            textTransform: 'capitalize',
            marginLeft: '15px',
        },
        body: {
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 400,
            [theme.breakpoints.down('sm')]: {
                height: 'calc(100% - 50px)',
                margin: 0,
            },
        },
    }),
);
