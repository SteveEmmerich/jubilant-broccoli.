
//Provide all pages router, head, and link
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import {composeInitialProps} from 'compose-next'
import provideNext from '../providers/providesNext';

export default provideNext(Router, Link, Head)