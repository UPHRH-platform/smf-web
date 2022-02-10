import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BtnOne, BtnTwo } from "../../components/buttons"
import Header from "../../components/common/Header"
import { HeadingOne } from "../../components/headings"
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import { UserService } from "../../services/user.service";

interface userProps {
    data?: any
}

interface IRole {
    id: number,
    description: string,
    code: string,
    name: string,
    orgId: number,
    createdBy: any,
    superAdmin: boolean,
    admin: boolean,
    isAdmin: boolean
    isChecked: boolean
}

interface Iuser {
    age?: number
    authToken?: null
    avatarUrl?: null
    country?: null
    countryCode?: null
    countryId?: null
    createdBy?: number
    createdDate: string
    dob: null
    emailId: string
    employmentType: null
    endDate: null
    firstName: string
    gender: string
    id: number
    isActive: true
    isDeleted: false
    lastName: string
    orgId: string
    password: null
    phoneNo: null
    profileId: null
    registrationDate: string
    roleId: null
    roles: IRole[]
    salary: null
    startDate: null
    timeZone: null
    updatedBy: number
    updatedDate: string
    username: string
}

export const CreateUser = ({ data }: userProps) => {
    let history = useHistory();
    const [roles, setRoles] = useState<IRole[]>([])
    const [userEdit, setUserEdit] = useState<any>()
    const [isEditMode, setIsEditMode] = useState(false)
    useEffect(() => {
        let loc: any = history.location
        if (loc.state && loc.state.userId) {
            UserService.getUserByID(loc.state.userId).then(
                (response2) => {
                    if (response2.statusInfo && response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
                        console.log(response2.responseData)
                        setUserEdit(response2.responseData)
                        setIsEditMode(true)
                    } else {
                        Notify.error(response2.statusInfo.errorMessage);
                    }
                },
                (error) => {
                    error.statusInfo
                        ? Notify.error(error.statusInfo.errorMessage)
                        : Notify.error(error.message);
                }
            );
            // setUserEdit(user)
        } else{
            setIsEditMode(false)
        }
    }, [])

    useEffect(() => {
        if (isEditMode) {
            handlesRoles(true)
        } else {
            handlesRoles(false)
        }
    }, [isEditMode])

    const handlesRoles = (isEdit: boolean) => {
        UserService.getRoles().then(
            (response2) => {
                if (response2.statusInfo && response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
                    if (isEdit) {
                        let rolesUpdated:any = []
                        userEdit && userEdit.roles.map((role: any, index: number) => {
                            rolesUpdated = response2.responseData.map((r: IRole, i: number) => {
                                if (r.id === role.id) {
                                    return { ...r, isChecked: true }
                                } else {
                                    return { ...r, isChecked: false }
                                }
                            })
                        })
                        setRoles(rolesUpdated)
                    } else {
                        const rolesUpdated = response2.responseData.map((r: IRole, i: number) => {
                            if (i === 0) {
                                return { ...r, isChecked: true }
                            } else {
                                return { ...r, isChecked: false }
                            }
                        })
                        setRoles(rolesUpdated)
                    }
                    // console.log('rolesUpdated :: ', rolesUpdated)
                } else {
                    Notify.error(response2.statusInfo.errorMessage);
                }
            },
            (error) => {
                error.statusInfo
                    ? Notify.error(error.statusInfo.errorMessage)
                    : Notify.error(error.message);
            }
        );
    }
    const createUser = (e: any) => {
        e.preventDefault();
        const selectedRoles = roles.filter(res => res.isChecked).map(ele => ele.id)

        let req = {}

        if (isEditMode) {
            req = {
                id: userEdit.id,
                emailId: e.target.email.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                roleId: selectedRoles
            }
        } else {
            req = {
                emailId: e.target.email.value,
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                roleId: selectedRoles
            }
        }
        UserService.createOrUpdateUser(req).then(
            (response2) => {
                if (response2.statusInfo && response2.statusInfo.statusCode === APP.CODE.SUCCESS) {
                    console.log(response2.responseData);
                    if(isEditMode) {
                        Notify.success('User edited successfully!');
                    } else {
                        Notify.success('User created successfully!');
                    }
                    history.push('/manage')
                } else {
                    Notify.error(response2.statusInfo.errorMessage);
                }
            },
            (error) => {
                error.statusInfo
                    ? Notify.error(error.statusInfo.errorMessage)
                    : Notify.error(error.message);
            }
        );
    }

    const onAddingRole = (e: any, i: any) => {
        // e.preventDefault();
        let tempRoles = [...roles]
        tempRoles.map((k: any, l: any) => {
            if (i === l) {
                k.isChecked = true
            } else {
                k.isChecked = false
            }
        });

        // tempRoles[i].isChecked  = !tempRoles[i].isChecked
        setRoles(tempRoles)
        console.log(roles)
    }

    const inputChange = (e: any) => {
        if(e.target.name === 'firstname'){
            console.log('e.target:', e.target.value)
            setUserEdit({
                ...userEdit,
                firstName: e.target.value
            })
        } else if(e.target.name === 'lastname'){
            console.log('e.target:', e.target.value)
            setUserEdit({
                ...userEdit,
                lastName: e.target.value
            })
        } else if(e.target.name === 'email') {
            console.log('e.target:', e.target.value)
            setUserEdit({
                ...userEdit,
                emailId: e.target.value
            })
        }
    }

    return (
        <Fragment>
            <Header history={history} />
            <div className="container-fluid">
                <div className="container dashboard-inner-container mt-4">
                    <form onSubmit={e => createUser(e)}>
                        <div className="row pt-2">
                            <div className="col-md-8 col-sm-12 col-12 pl-0">
                                <HeadingOne heading="Create user" />
                            </div>
                            <div className="col-md-4 col-sm-12 col-12 text-right pr-0">
                                <BtnOne btnType="cancel" label="Cancel" isLink={true} link="/manage" floatBottom={false} isModal={false} />
                                <span className="ml-3">
                                    <BtnTwo btnType="submit" label="Save" isLink={false} link={``}
                                        floatBottom={false} isModal={false} />
                                </span>
                            </div>
                        </div>
                        <div className="row pt-2 ">
                            <div className="col-12 white-bg ">
                                <div className="p-3">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="firstname">First name</label>
                                        <input type="text" className="form-control" id="firstname" name="firstname" placeholder="First name" 
                                        value={`${userEdit && userEdit.firstName || ''}`} onChange={e => inputChange(e)}required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="lastname">Last name</label>
                                        <input type="text" className="form-control" id="lastname"  name="lastname"placeholder="Last name" 
                                        value={`${userEdit && userEdit.lastName || ''}`} onChange={e => inputChange(e)}required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email id</label>
                                        <input type="email" className="form-control in-valid" id="email" name="email" placeholder="Email" 
                                        value={`${userEdit && userEdit.emailId || ''}`} onChange={e => inputChange(e)}required />
                                        {/* <div className="invalid-feedback">Email is required</div> */}
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="d-block" htmlFor="inputEmail">Role</label>
                                        {roles.map((role, key) => (
                                            <div className="radio form-check-inline" key={key}>
                                                <label
                                                    htmlFor={"field-" + role.id + key}
                                                    className={
                                                        "mr-2 noselect custom-radio radio-label-" +
                                                        role.id + ' ' + (role.isChecked ? 'selected' : '')
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        name={"field_" + role.id}
                                                        id={"field-" + role.id + key}
                                                        className={
                                                            "mr-2 form-radio-input field_" +
                                                            role.id +
                                                            "_radio"
                                                        }
                                                        checked={role.isChecked ? true : false} onChange={e => onAddingRole(e, key)}
                                                    />
                                                    {" " + role.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}