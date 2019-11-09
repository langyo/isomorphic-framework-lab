import React from 'react';
import Head from 'next/head';

import { connect } from 'react-redux';

import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { pages, dialogs, views } from '../src/connector';
import viewMap from '../src/viewMap';

export default connect(state => ({ state }), dispatch => ({}))(props => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return ([
    <Head>
      <title>晨检上报系统</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>,
    <>
      {viewMap.reverse().reduce(
        (prev, next) => React.createElement(
          views[next], { child: React.createElement(views[prev]) })
        ,
        <>
          {Object.keys(dialogs).map((n, index) => <div key={index}>{React.createElement(dialogs[n])}</div>)}
          {React.createElement(pages[props.renderPage])}
        </>
      )}
    </>
  ]);
});
