/* layout for log-in  page*/

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
  },
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


class LoginForm extends Component {

  form = React.createRef();

    state = {
        username: '',
        password: '',
        type: ''
    }


    submitHandle = () => {
        console.log('!!!!!!!!!!!!!!!!')
        if(!this.state.username || !this.state.password || !this.state.type){
            return
        }

        let state = {
            username:this.state.username,
            password:this.state.password,
            type:this.state.type,
        }
        console.log(state)

        let url = 'http://127.0.0.1:8000/login/'

         axios.post(url, state, {withCredentials:'true', headers: {'Content-Type': 'application/json'}}
          ).then(res=>{
            if(res.status === 200){
                alert('登录成功。')
                // this.props.history.push('/homepage')
            }
            else{
                console.log(res)
                alert('登录失败：' + res.data.msg)
            }

        })
    }

     handleSubmit = (e) => {
        console.log(this.state)
        // e.preventDefault();
        // let error = false
        // this.props.form.validateFields((err, values) => {
        //     console.log(err)
        //     console.log(values)
        //     if (!err) {
        //         console.log('error'+error)
        //         console.log('Received values of form: ', values);
        //         return
        //     }
        // });
        this.submitHandle()
    }

    handleUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleType = (e) => {
        this.setState({
            type : e.target.value
        })
    }


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
                  <Image src='/logo.png'/> Log on your account
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
                        ]}
                        hasFeedback>
                        <Input.Password onChange={this.handlePassword}/>
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

                    <Form.Item {...tailFormItemLayout}>
                    <Button
                        color='black' fluid size='large' onChange={this.handleSubmit}>
                      Log In
                    </Button>
                   </Form.Item>
                           </Segment>
                </Form>
                <Message>
                  Don't have an account? <a href='/container/register'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </Container>
            <BottomBar/>
        </div>
    )
  }
}

export default LoginForm;