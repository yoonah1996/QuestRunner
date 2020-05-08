/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AWS from 'aws-sdk';
import RunnerA from '../../img/runnerA.gif';
// const { accessKeyId, secretAccessKey, bucketName } = process.env;

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
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  image: {
    height: 230,
    width: 200,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
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
    console.log(props);
    const params: any = {
      Bucket: bucketName,
      Key: props._id,
    };
    s3.getObject(params, (err: AWS.AWSError, data: any) => {
      if (err) {
        return '';
      }
      console.log(data);
      const blob = new Blob([data.Body], { type: data.ContentType });
      const blobUrl = URL.createObjectURL(blob);
      setValue(blobUrl);
    });
  };

  useEffect(() => {
    getRankTop();
  }, [props]);

  return (
    <div>
      {!props.profilePic ?
        <img className={classes.image} src={RunnerA} alt="" />
        : <img className={classes.image} src={value} alt="" />}
      {!props.username ? null : (
        <div>
          {props.username}
          님
        </div>
      )}
      {!props.motto ? null : (
        <div>
          좌우명 :
          {props.motto}
        </div>
      )}
    </div>
  );
};

export default TopThree;
