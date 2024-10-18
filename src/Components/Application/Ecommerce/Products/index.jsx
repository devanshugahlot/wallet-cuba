import React, { useState } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import ProductFeatures from './ProductFeatures';
import ProductGrid from './ProductGrid';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


const ProductContain = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');

    const generateOtp = () => {
        // Generate a 6-digit random OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const sendOtpViaEmail = async (otp, email) => {
        try {
            // Replace this with your server endpoint to send OTP via email
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp, email }),
            });

            if (response.ok) {
                console.log('OTP sent successfully.');
            } else {
                console.error('Failed to send OTP.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if the email is present
        if (!email) {
            console.error('Email is required.');
            return;
        }

        // Generate OTP
        const generatedOtp = generateOtp();

        // Call function to send OTP via email
        await sendOtpViaEmail(generatedOtp, email);

        // Set OTP sent state to true and store the generated OTP
        setOtpSent(true);
        setOtp(generatedOtp);
    };

    return (
        <React.Fragment>
            <Breadcrumbs parent="Ecommerce" title="Products" mainTitle="Products" />
            <Container fluid className="product-wrapper">
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: "center",
                    }}    className="fristicon"
                    >

                        <h5 style={{ fontSize: '16px', fontFamilyL: 'Roboto, Helvetica, Arial, sans-serif' }}>Main Wallet</h5>
                        <div className="frist-wallet-1">
                            <AccountBalanceWalletIcon
                                style={{ color: "rgb(216, 175, 114)" }}
                            />
                            <span style={{ color: '#000', marginLeft: '3px' }}>10000000000</span>
                        </div>
                    </div>

                </div>

                {/* Add logic to display main wallet balance */}
                <Row className="mt-4">
                    <Col md={6}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email (Enter Email Address)</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="walletAddress">Wallet Address (Enter Wallet Address)</Label>
                                <Input
                                    type="text"
                                    id="walletAddress"
                                    placeholder="Enter Wallet Address"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Amount & (Enter Amount)</Label>
                                <Input
                                    type="number"
                                    id="amount"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Get OTP
                            </Button>
                        </Form>
                        {otpSent && (
                            <div className="mt-3">
                                <p>OTP sent to your email address.</p>
                                {/* Display OTP entry field */}
                                <FormGroup>
                                    <Label for="otp">Enter OTP</Label>
                                    <Input
                                        type="text"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </FormGroup>
                                {/* Add logic to handle OTP verification */}
                                {/* For simplicity, assuming verification on input change */}
                                {/* {otp === generatedOtp && <p>OTP Verified!</p>} */}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ProductContain;
