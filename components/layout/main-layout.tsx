import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'next/link';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Turing Machine Simulator
          </Typography>
          <Link href="https://github.com/kkoudelka/turing-machine-simulator">
            <Tooltip title="This project is open-source">
              <IconButton color="inherit">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </>
  );
};

export default MainLayout;
