import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegUserCircle, FaBug } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoLogOut } from "react-icons/io5";
import {
  getLocalStorageRole,
  removeLocalStorageRole,
  removeLocalStorageToken,
} from "../../helpers/localstorage";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { LogoutServices } from "../../services/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SidebarObject = {
  employee: [
    {
      label: "Bug Resolver",
      route: "/",
      icon: FaBug,
    },
    {
      label: "DashBoard",
      route: "/",
      icon: HiChartPie,
    },
    {
      label: "My Profile",
      route: "/my-profile",
      icon: FaRegUserCircle,
    },
    {
      label: "New Bug",
      route: "/create-bug",
      icon: FaBug,
    },
    {
      label: "Created Bugs",
      route: "/bugs/created",
      icon: MdPlaylistAdd,
    },
    {
      label: "Assigned Bugs",
      route: "/bugs/assigned",
      icon: MdPlaylistAddCheck,
    },
    {
      label: "All Bugs",
      route: "/bugs/all",
      icon: CiBoxList,
    },
    
  ],
  manager: [
    {
      label: "Bug Resolver",
      route: "/",
      icon: FaBug,
    },
    {
      label: "DashBoard",
      route: "/",
      icon: HiChartPie,
    },
    {
      label: "My Profile",
      route: "/my-profile",
      icon: FaRegUserCircle,
    },
    {
      label: "New  Bug",
      route: "/create-bug",
      icon: FaBug,
    },
    {
      label: "Created Bugs",
      route: "/bugs/created",
      icon: MdPlaylistAdd,
    },
    {
      label: "Assigned Bugs",
      route: "/bugs/assigned",
      icon: MdPlaylistAddCheck,
    },
    {
      label: "All Bugs",
      route: "/bugs/all",
      icon: CiBoxList,
    },
    {
      label: "Bugs Graph",
      route: "/bug-graph",
      icon: BsGraphUpArrow,
    },
    
  ],
};

const SidebarComponent = () => {
  const navigate = useNavigate();
  const role = getLocalStorageRole();

  const logoutFunction = async () => {
    const response = await LogoutServices();
    if (response.success) {
      removeLocalStorageRole();
      removeLocalStorageToken();
      toast.success(response.message);
      navigate("/abhishyandh");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className="sidebarclass">
        <Sidebar.Items>
        
          <Sidebar.ItemGroup>
            {SidebarObject?.[role]?.map((item, index) => {
              if (item.children) {
                return (
                  <Sidebar.Collapse
                    key={index}
                    icon={item.icon}
                    label={item.label}
                  >
                    {item.children.map((child, childIndex) => (
                      <Sidebar.Item
                        key={childIndex}
                        onClick={() => navigate(item.route)}
                      >
                        {child.label}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                );
              } else {
                return (
                  
                  <Sidebar.Item
                    key={index}
                    onClick={() => navigate(item.route)}
                    icon={item.icon}
                   className="sidebarclass"
                  >
                    {item.label}
                  </Sidebar.Item>
                );
              }
            })}

            <Sidebar.Item
              onClick={logoutFunction}
              icon={IoLogOut}
             className="sidebarclass"
            >
              Logout
            </Sidebar.Item>
             
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
<br/>
<br/>
         
    </div>
  );
};

export default SidebarComponent;
