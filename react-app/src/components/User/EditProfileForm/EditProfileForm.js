import React, { useState, useCallback } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { API_HOST } from "../../../utils/constants"
import { Camera } from "../../../utils/icons"
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from '../../../api/user'

import "./EditProfileForm.scss"

export default function EditProfileForm(props) {
    const { setShowModal, user } = props
    const [formData, setFormData] = useState(initialValue(user));
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}/getBanner?id=${user.id}` : null
    )
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/getAvatar?id=${user.id}` : null
    )
    const [bannerFile, setBannerFile] = useState(null)
    const [avatarFile, setAvatarFile] = useState(null)
    const [loading, setLoading] = useState(false)


    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setBannerUrl(URL.createObjectURL(file))
        setBannerFile(file)
        // console.log(URL.createObjectURL(file))
        // console.log(acceptedFile)
    })
    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    })

    const onDropAvatar = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    });
    const {
        getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps,
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar,
    });

    const onSubmit = async (e)=> {
        e.preventDefault()
        setLoading(true)

        if(bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("An error occurred while uploading the banner")
            })
        }

        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("An error occurred while uploading the avatar")
            })
        }

        await updateInfoApi(formData).then(() => {
            setShowModal(false)
        }).catch(() => {
            toast.error("An error occurred while updating the user's data")
        }).finally(() => {
            setLoading(false)
            window.location.reload()
        })

    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    return (
        <div className="edit-user-form">
            <div className="banner" style={{ backgroundImage: `url('${bannerUrl}')` }} {...getRootBannerProps()}>
                <input {...getInputBannerProps()}></input>
                <Camera />
            </div>
            <div className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }} {...getRootAvatarProps()}>
                <input {...getInputAvatarProps()}></input>
                <Camera />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Name" name="name"  defaultValue={formData.name} onChange={onChange}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Last Name" name="last" defaultValue={formData.last}onChange={onChange} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" row="3" placeholder="Add a biography" type="text" name='biography' defaultValue={formData.biography} onChange={onChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control placeholder="Website" type="text" name='website' defaultValue={formData.website} onChange={onChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <DatePicker placeholder='Date of birth' selected={new Date(formData.bod)} onChange={date => setFormData({...formData, bod: date})}></DatePicker>
                </Form.Group>
                <Button className='btn-submit' variant="primary" type="submit" >
                    {loading && <Spinner animation='border' size='sm' />}
                    Update
                    </Button>
            </Form>
        </div>
    )
}

function initialValue(user) {
    return {
        name: user.name || "",
        last: user.last || "",
        biography: user.biography || "",
        location: user.location || "",
        website: user.website || "",
        bod: user.bod || "",
    };
}