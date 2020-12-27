/* layout for register page*/

import "semantic-ui-css/semantic.min.css"
import React,{Component} from 'react'
import { Form,Input,Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import {Button, Container, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import axios from 'axios'
import TopBar from "../../basic/top_bar";
import BottomBar from "../../basic/bottom_bar";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 28,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 46,
    },
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 10,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


class RegistrationForm extends Component {

  form = React.createRef();

  state = {
    confirmDirty: false,
    email: '',
    username: '',
    password: '',
    type:''
  }

  submitH = () =>{
      console.log("**********in submit************")
    if(!this.state.email || !this.state.password || !this.state.username || !this.state.type){
      return
    }

    // const params = new URLSearchParams();
    // params.append('email', this.state.email);
    // params.append('username', this.state.username);
    // params.append('password', this.state.password);
    // params.append('type', this.state.type);
    let data = {email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      type:this.state.type}

      // console.log(params)

    let url = 'http://127.0.0.1:8000/register/'

      console.log("**********begin submit************")
    axios.post(url, data, {withCredentials:'true', headers: {'Content-Type': 'application/json'}}
    // axios.post(url, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    //   axios.post(url, data
    ).then(res=>{
      if(res.status === 200){
          console.log(res.data);
        alert('注册成功。'+res);
          console.log("**********success************");
          // this.props.history.push('/login')
      }
      else{
          console.log("**********fail************");
        console.log(res);
        alert('注册失败：' + res.data.msg);
      }
    })
  }

  handleEmail = (e) =>{
    this.setState({
      email: e.target.value
    })
  }

  handlePassword = (e) =>{
    this.setState({
      password: e.target.value
    })
  }

  handleUsername = (e) =>{
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
    this.submitH();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleType = e => {
      this.setState({
              type: e.target.value
          }
      )
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {

    /* */
    return (
        <div>
            <TopBar />
          <Container>
            <style>
              {`
           html, body {
            background-color: #252839 !important;
            }
          `}
            </style>
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
              <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' style={{color: 'white'}} textAlign='center'>
                  {/*<Image src='/logo.png'/> */}
                  Register a new account
                </Header>

                       <Form
                           {...formItemLayout}
                           ref={this.form}
                           name="register"
                           onFinish={this.handleSubmit}
                           layout = "horizontal"
                           scrollToFirstError
                       >
                           <Segment inserted>

                           <Form.Item
                               name="email"
                               label="E-mail"
                               rules={[
                                   { type: 'email',
                                       message: 'The input is not valid E-mail!',
                                   },
                                   {
                                       required: true,
                                       message: 'Please input your E-mail!',
                                   },
                               ]}
                           >
                               <Input onChange = {this.handleEmail} />
                           </Form.Item>

                    <Form.Item
                         name ="username"
                         label ="User Name"
                          rules= {[
                            {
                              required: true,
                              message: 'Please input your User Name!',
                            },
                          ]}
                      >
                        <Input onChange={this.handleUsername} />
                    </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                {/*{
                                        validator: this.validateToNextPassword
                                    },*/}
                            ]}
                            hasFeedback>
                            <Input.Password onChange={this.handlePassword}/>
                        </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                          rules= {[
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },

                              ({ getFieldValue }) => ({
                                  validator(rule, value) {
                                      if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                      }
                                      return Promise.reject('The two passwords that you entered do not match!');
                                      },
                              }),
                          ]} >
                    <Input.Password onBlur={this.handleConfirmBlur} />
                    </Form.Item>


                    <Form.Item
                        name="Developer/Player"
                        label={
                            <span>
                                Type &nbsp;
                                <Tooltip title="Are you a developer or a player?">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>}

                        rules={[
                            {
                                required: true,
                                message: 'Please input your type("developer or player")!'
                            },
                            {
                                pattern: /(developer|player)/,
                                message: 'Input "developer" or "player"!'
                            },
                        ]}>
                      <Input onChange={this.handleType} />
                       </Form.Item>

                    <Form.Item >
                    <Button
                        style={  {marginBottom:'1em',marginTop: '0em'}}
                        color='black' fluid size='large' onChange={this.handleSubmit}>
                      Sign Up
                    </Button>
                   </Form.Item>
                           </Segment>
                </Form>
                <Message>
                  Already have an account? <a href='/container/login'>Log In</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Container>
            <BottomBar />
        </div>
    )
  }
}

export default RegistrationForm;
