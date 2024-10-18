import CartData from './CartData';
import React, { Fragment } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import { Card, Col, Container, Row } from 'reactstrap';
import InvoiceContain from '../Invoice';

const ProductCartConatain = () => {
    return (
        <Fragment>
            <Breadcrumbs parent="Income Report" title="Income Transaction" mainTitle='Income Transaction' />
            <Container fluid={true}>
             <InvoiceContain/>
            </Container>
        </Fragment>
    );
};
export default ProductCartConatain;