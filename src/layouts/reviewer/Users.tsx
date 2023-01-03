/*eslint-disable eqeqeq*/
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from "react";
// import { useHistory } from "react-router"
import { Link } from "react-router-dom";
import { BtnTwo } from "../../components/buttons";
import {ConfirmModal } from "../../components/modal";
import { APP } from "../../constants";
import Notify from "../../helpers/notify";
import Util from "../../helpers/util";
import Helper from "../../helpers/auth";
import { UserService } from "../../services/user.service";

interface userProps {
  data?: any;
}

interface IRole {
  id: number;
  description: string;
  code: string;
  name: string;
  orgId: number;
  createdBy: any;
  superAdmin: boolean;
  admin: boolean;
  isAdmin: boolean;
  isChecked: boolean;
}

interface Iuser {
  age: number;
  authToken: null;
  avatarUrl: null;
  country: null;
  countryCode: null;
  countryId: null;
  createdBy: number;
  createdDate: string;
  dob: null;
  emailId: string;
  employmentType: null;
  endDate: null;
  firstName: string;
  gender: string;
  id: number;
  isActive: true;
  isDeleted: false;
  lastName: string;
  orgId: string;
  password: null;
  phoneNo: null;
  profileId: null;
  registrationDate: string;
  roleId: null;
  roles: IRole[];
  salary: null;
  startDate: null;
  timeZone: null;
  updatedBy: number;
  updatedDate: string;
  username: string;
}

export const Users = ({ data }: userProps) => {
  // let history = useHistory();
  let [users, setUsers] = useState<Iuser[]>([]);
  let [filteredUsers, setFilteredUsers] = useState<Iuser[]>([]);
  const isSuperAdmin = Helper.isSuperAdmin();
  let [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  let [userToDelete, setUserToDelete] = useState<Iuser>();


  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    // console.log(value);
    result = users.filter((data) => {
      return (
        data.firstName.toLocaleLowerCase().search(value) != -1 || //search firstname
        data.lastName.toLocaleLowerCase().search(value) != -1 || //search lastname
        (
          data.firstName.toLocaleLowerCase() +
          " " +
          data.lastName.toLocaleLowerCase()
        ).search(value) != -1 //search 'firstname lastname'
      );
    });
    setFilteredUsers(result);
  };

  const deleteUser = () => {
    UserService.deleteUser(userToDelete?.id).then(
      (response) => {
          if (response.statusInfo && response.statusInfo.statusCode === APP.CODE.SUCCESS) {
              console.log(response.responseData);
              Notify.success('User deleted successfully!');
              getAllUsers();
          } else {
              Notify.error(response.statusInfo.errorMessage);
          }
          setShowConfirmModal(false);
      },
      (error) => {
          error.statusInfo
              ? Notify.error(error.statusInfo.errorMessage)
              : Notify.error(error.message);
          setShowConfirmModal(false);
      }
    );
  }

  const getAllUsers = () => {
    // get users
    UserService.getAllUsers().then(
      (response2) => {
        if (
          response2.statusInfo &&
          response2.statusInfo.statusCode === APP.CODE.SUCCESS
        ) {
          setUsers(response2.responseData);
          setFilteredUsers(response2.responseData);
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

  useEffect(() => {
    getAllUsers();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="row pt-2">
        <div className="col-sm-12 col-md-4">
          <form className="">
            <div className="input-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                id="searchUsers"
                placeholder="Search users"
                onChange={(event) => handleSearch(event)}
              />
            </div>
          </form>
        </div>
        <div className="col-sm-12 col-md-8 text-right">
          <BtnTwo
            btnType="button"
            label="Add new user"
            isLink={true}
            link={`/create-user`}
            floatBottom={false}
            isModal={false}
          />
        </div>
      </div>
      <div className="row pt2">
        <div className="col-12">
          <table className="table table-smf">
            <thead className="thead-light">
              <tr>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                {/* <th scope="col">Published/created on</th> */}
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, key) => (
                <tr key={key} className="form-item">
                  <td className="form-title">{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.emailId}</td>
                  <td>
                    {user.roles.map((role, i) => {
                      return (
                        <span key={i}>
                          <span>{Util.getRoleLabel(role.name)}</span>
                          {i !== user.roles.length - 1 && <span>,</span>}
                        </span>
                      );
                    })}
                  </td>
                  <td className="td-preview">
                    <Link
                      to={{
                        pathname: `/edit-user/${user.id}`,
                        state: { userId: user.id },
                      }}
                    >
                      Edit
                    </Link>
                    {isSuperAdmin && (
                     <span 
                      className="ml-3 text-danger  pointer"  
                      onClick={
                        () => {
                          setUserToDelete(user);
                          setShowConfirmModal(true);
                        }
                      }>Delete</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title="Delete User"
          onConfirm={deleteUser}
          onCancel={() => {
            setUserToDelete(undefined);
            setShowConfirmModal(false)}
          }
        > Do you want to delete {userToDelete?.firstName} ?</ConfirmModal>
      )}
    </Fragment>
  );
};
