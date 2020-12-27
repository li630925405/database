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


class ModifyForm extends Component {

  form = React.createRef();

    state = {
        oldPassword: '',
        newPassword: '',
    }

     handleSubmit = (e) => {
        console.log(this.state)
        if( !this.state.oldPassword || !this.state.newPassword){
            return
        }

        let state = {
            oldPassword:this.state.oldPassword,
            newPassword:this.state.newPassword,
        }

        let url = 'http://127.0.0.1:8000/modify_user/'

         axios.post(url, state, {withCredentials:'true', headers: {'Content-Type': 'application/json'}}
          ).then(res=>{
            if(res.status === 200){
                alert('修改成功。')
                // this.props.history.push('/homepage')
            }
            else{
                console.log(res)
                alert('修改失败：' + res.data.msg)
            }
        })
    }

    handleLogOut = () => {
        //back end
        console.log("in logout");
        let url = 'http://127.0.0.1:8000/logout/';

         axios.get(url, {withCredentials:'true', headers: {'Content-Type': 'application/json'}}
          ).then(res=>{
            if(res.status === 200){
                alert('登出成功。');
                // this.props.history.push('/homepage')
            }
            else{
                console.log(res);
                alert('登出失败：' + res.data.msg)
            }
        })
    };


    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }

    handleOldPassword = (e) => {
        this.setState({
            oldPassword: e.target.value
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
                  <Image src='/logo.png'/> Edify your account
                </Header>

                       <Form
                           {...formItemLayout}
                           ref={this.form}
                           name="modify"
                           onFinish={this.handleSubmit}
                           layout = "horizontal"
                           scrollToFirstError
                       >
                           <Segment inserted>

                    <Form.Item
                         name ="password1"
                         label ="Old Password"
                          rules= {[
                            {
                              required: true,
                              message: 'Please input your old password!',
                            },
                          ]}
                      >
                        <Input.Password onChange={this.handleOldPassword} />
                    </Form.Item>

                    <Form.Item
                        name="password2"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                        hasFeedback>
                        <Input.Password onChange={this.handleNewPassword}/>
                    </Form.Item>

                    <Form.Item >
                    <Button
                        style={ {marginBottom:'1em',marginTop: '0em'}}
                        color='black' fluid size='large' onChange={this.handleSubmit}>
                      Submit
                    </Button>
                   </Form.Item>
                           </Segment>
                </Form>
                <Message>
                  Want to log out?  <Button onClick={this.handleLogOut}>Log Out</Button>
                </Message>
              </Grid.Column>
            </Grid>
          </Container>
            <BottomBar/>
        </div>
    )
  }
}

export default ModifyForm;