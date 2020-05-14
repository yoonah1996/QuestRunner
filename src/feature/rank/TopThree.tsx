/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AWS from 'aws-sdk';
// import dotenv from 'dotenv';
import RunnerA from '../../img/runnerA.gif';
// dotenv.config();
// require('dotenv').config();

// const { accessKeyId, secretAccessKey, bucketName } = process.env;
// accessKeyId, secretAccessKey, bucketName 값

const accessKeyId = 'AKIAJETOR3EJQUYUCD6A';
const secretAccessKey = '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';
const bucketName = 'qrunner-avatar';


const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  useAccelerateEndpoint: false,
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    backgroundColor: 'white !important',
  },
  image: {
    height: 260,
    width: 250,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
  },
  names: {
    textAlign: 'center',
    fontFamily: 'Gamja Flower, cursive',
    backgroundColor: 'rgba(255,255,255,0)',
    fontSize: '25px',
    textOverflow: 'ellipsis',
    width: '250px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  mottoback: {
    display: 'table',
    position: 'absolute',
    height: '50px',
    width: '250px',
    bottom: '0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  mottos: {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'sub',
    fontFamily: 'Caveat, Nanum Brush Script, cursive',
    fontSize: '25px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '250px',
  },
}));

interface threetype {
  profilePic: string;
  motto: string;
  experience: number;
  _id: string;
  username: string;
}

const TopThree: React.FC<threetype> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const getRankTop = async () => {
    if (props.profilePic) {
      const params: any = {
        Bucket: bucketName,
        Key: props._id,
      };
      s3.getObject(params, (err: AWS.AWSError, data: any) => {
        if (err) {
          return '';
        }
        const blob = new Blob([data.Body], { type: data.ContentType });
        const blobUrl = URL.createObjectURL(blob);
        setValue(blobUrl);
      });
    }
  };

  useEffect(() => {
    getRankTop();
  }, [props]);

  return (
    <div>
      <div className={classes.control}>
        {!props.profilePic ?
          <img className={classes.image} src={RunnerA} alt="" />
          : <img className={classes.image} src={value} alt="" />}
      </div>
      {!props.username ? <p /> : (
        <div className={classes.names}>
          {props.username}
          님
        </div>
      )}
      <div className={classes.mottoback}>
        {!props.motto ? null : (
          <div className={classes.mottos}>
            좌우명 :
            {props.motto}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopThree;
