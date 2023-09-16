<template>
    <nav v-if="getmiUsuario && getmiUsuario.id_usuario"
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-72 z-10 py-4 px-6">

        <div
            class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <!-- Toggler -->
            <button
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                type="button" v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')">
                <i class="fas fa-bars"></i>
            </button>
            <!-- Brand -->
            <router-link
                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                to="/admin">
                <img src="@/assets/logotipoEmpresa.png" class="w-full" alt="DENTIMAGEN LOGO">
            </router-link>
            <!-- User -->
            <ul class="md:hidden items-center flex flex-wrap list-none">
                <li class="inline-block relative">
                    <notification-dropdown />
                </li>
                <li class="inline-block relative">
                    <user-dropdown />
                </li>
            </ul>
            <!-- Collapse -->

            <div class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
                v-bind:class="collapseShow">
                <!-- Collapse header -->
                <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                    <div class="flex flex-wrap">
                        <div class="w-6/12">
                            <router-link
                                class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                to="/admin">
                                Dentimagen
                            </router-link>
                        </div>
                        <div class="w-6/12 flex justify-end">
                            <button type="button"
                                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                v-on:click="toggleCollapseShow('hidden')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form class="mt-6 mb-4 md:hidden">
                    <div class="mb-3 pt-0">
                        <input type="text" placeholder="Search"
                            class="border-0 px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
                    </div>
                </form>

                <p class="uppercase text-center text-xs">{{ getmiUsuario.rol }}</p>
                <!-- Divider -->
                <hr class="my-4 md:min-w-full" />
                <!-- Navigation -->

                <ul class="md:flex-col md:min-w-full flex flex-col ml-5 list-none">
                    <li class="items-center">
                        <router-link to="/admin/dashboard"
                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                            <i class="fas fa-tv mr-2 text-sm text-gray-400"></i>
                            Inicio
                        </router-link>
                    </li>

                    <li v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')"
                        class="items-center">

                        <router-link to="/admin/usuarios"
                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                            <i class="fa-solid fa-user-nurse mr-2 text-sm text-gray-400"></i>
                            Usuarios | Trabajadores
                        </router-link>
                    </li>

                </ul>

                <!-- Divider -->
                <hr class="my-4 md:min-w-full" />
                <!-- Heading -->


                <el-row class="tac">
                    <el-col>
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="fa-solid fa-hospital-user text-sm"></i>
                                    <span
                                        class="ml-3 md:min-w-full  text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Pacientes</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">
                                        <router-link to="/admin/paciente/agregar"
                                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                                            <i class="fa-solid fa-hospital-user mr-2 text-sm"></i>
                                            Nuevo Paciente
                                        </router-link>
                                    </el-menu-item>
                                    <el-menu-item index="1-2">
                                        <li class="items-center">
                                            <router-link to="/admin/paciente/lista"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-users mr-2 text-sm"></i>
                                                Lista de Pacientes
                                            </router-link>
                                        </li>
                                    </el-menu-item>

                                    <el-menu-item index="1-3"
                                        v-if="getmiUsuario.rol != ('Secretaria') && getmiUsuario.rol != ('Administrador')">
                                        <li class="items-center">
                                            <router-link to="/admin/odontodiagrama/registro"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-teeth-open mr-2 text-sm"></i>
                                                Nuevo Odontodiagrama
                                            </router-link>
                                        </li>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>

                <hr class="my-4 md:min-w-full" v-if="getmiUsuario.rol != ('Odontologo')" />



                <!-- <el-row >
                    <el-col >
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="1">

                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>Navigator One</span>
                                </template>

                                <el-menu-item-group title="Group One">
                                    <el-menu-item index="1-1">item one</el-menu-item>
                                    <el-menu-item index="1-2">item one</el-menu-item>
                                </el-menu-item-group>

                                <el-menu-item-group title="Group Two">
                                    <el-menu-item index="1-3">item three</el-menu-item>
                                </el-menu-item-group>

                                <el-submenu index="1-4">
                                    <template slot="title">item four</template>
                                    <el-menu-item index="1-4-1">item one</el-menu-item>
                                </el-submenu>

                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row> -->

                <!-- 
                    <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Consultas
                    </h6> 
                -->

                <!-- <ul class="md:flex-col md:min-w-full flex flex-col list-none"> -->
                <!-- <li class="items-center">
                        <router-link to="/admin/paciente/agregar"
                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                            <i class="fa-solid fa-hospital-user mr-2 text-sm"></i>
                            Nuevo Paciente
                        </router-link>
                    </li> -->
                <!-- <li class="items-center">
                        <router-link to="/admin/paciente/lista"
                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                            <i class="fa-solid fa-users mr-2 text-sm"></i>
                            Lista de Pacientes
                        </router-link>
                    </li>
                    <li v-if="getmiUsuario.rol != ('Secretaria') && getmiUsuario.rol != ('Administrador')"
                        class="items-center">
                        <router-link to="/admin/odontodiagrama/registro"
                            class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                            exact-active-class="text-emerald-500 hover:text-emerald-600">
                            <i class="fa-solid fa-teeth-open mr-2 text-sm"></i>
                            Nuevo Odontodiagrama
                        </router-link>
                    </li> -->
                <!-- </ul> -->


                <el-row class="tac" v-if="getmiUsuario.rol != ('Odontologo')">
                    <el-col>
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="fa-solid fa-money-bills text-sm"></i>
                                    <span
                                        class="ml-3 md:min-w-full  text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Ventas
                                        y Presupuesto</span>
                                </template>


                                <el-menu-item-group v-if="getmiUsuario.rol != ('Odontologo')" title="Ventas a Clientes">
                                    <el-menu-item index="1-1">
                                        <li class="items-center">
                                            <router-link to="/admin/recibo/venta/agregar"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                                Nueva Venta
                                            </router-link>
                                        </li>
                                    </el-menu-item>

                                    <el-menu-item index="1-2">
                                        <li class="items-center">
                                            <router-link to="/admin/recibo/venta/lista"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-money-bills mr-2 text-sm"></i>
                                                Listar Ventas
                                            </router-link>
                                        </li>
                                    </el-menu-item>
                                </el-menu-item-group>

                                <el-menu-item-group v-if="getmiUsuario.rol != ('Odontologo')"
                                    title="Presupuestos a Clientes">
                                    <el-menu-item index="1-3">
                                        <li class="items-center">
                                            <router-link to="/admin/presupuesto/venta/agregar"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-wallet mr-2 text-sm"></i>
                                                Nuevo Presupuesto
                                            </router-link>
                                        </li>
                                    </el-menu-item>

                                    <el-menu-item index="1-4">
                                        <li class="items-center">
                                            <router-link to="/admin/presupuesto/venta/lista"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-money-bills mr-2 text-sm"></i>
                                                Listar Presupuestos
                                            </router-link>
                                        </li>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>

                        </el-menu>
                    </el-col>
                </el-row>

                <hr class="my-4 md:min-w-full"
                    v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')" />

                <el-row class="tac" v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')">
                    <el-col>
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                    <span
                                        class="ml-3 md:min-w-full  text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Recibo
                                        de compras</span>
                                </template>

                                <el-menu-item-group
                                    v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')">
                                    <el-menu-item index="1-5">
                                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                                            <li class="items-center">
                                                <router-link to="/admin/recibo/compra/agregar"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                                    Nueva Compra
                                                </router-link>
                                            </li>
                                        </ul>
                                    </el-menu-item>

                                    <el-menu-item index="1-6">
                                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                                            <li class="items-center">
                                                <router-link to="/admin/recibo/compra/lista"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                                    Listar Compras
                                                </router-link>
                                            </li>
                                        </ul>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>

                        </el-menu>
                    </el-col>
                </el-row>
                <hr class="my-4 md:min-w-full" />

                <!-- <div v-if="getmiUsuario.rol != ('Odontologo')"> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Ventas a Clientes
                    </h6>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        
                        <li class="items-center">
                            <router-link to="/admin/recibo/venta/agregar"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                Nueva Venta
                            </router-link>
                        </li>

                        <li class="items-center">
                            <router-link to="/admin/recibo/venta/lista"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-money-bills mr-2 text-sm"></i>
                                Listar Ventas
                            </router-link>
                        </li>

                    </ul>
                </div> -->

                <!-- <div v-if="getmiUsuario.rol != ('Odontologo')"> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Presupuestos a Clientes
                    </h6>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/presupuesto/venta/agregar"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-wallet mr-2 text-sm"></i>
                                Nuevo Presupuesto
                            </router-link>
                        </li>
                        <li class="items-center">
                            <router-link to="/admin/presupuesto/venta/lista"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-money-bills mr-2 text-sm"></i>
                                Listar Presupuestos
                            </router-link>
                        </li>
                    </ul>
                </div> -->

                <!-- <div v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')"> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Compras a Proveedores
                    </h6>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/recibo/compra/agregar"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                Nueva Compra
                            </router-link>
                        </li>
                    </ul>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/recibo/compra/lista"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                Listar Compras
                            </router-link>
                        </li>
                    </ul>
                </div> -->


                <el-row class="tac">
                    <el-col>
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="fa-solid fa-boxes-stacked  text-sm"></i>
                                    <span
                                        class="ml-3 md:min-w-full text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Insumos</span>
                                </template>
                                <el-menu-item-group>

                                    <el-menu-item index="1-1">
                                        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                                            <li class="items-center">
                                                <router-link to="/admin/inventario"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-solid fa-boxes-stacked mr-2 text-sm"></i>
                                                    Inventario
                                                </router-link>
                                            </li>
                                        </ul>
                                    </el-menu-item>

                                    <el-menu-item index="1-2"
                                        v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')">
                                        <li class="items-center">
                                            <router-link to="/admin/materiales"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-recycle mr-2 text-sm"></i>
                                                Lista de Materiales
                                            </router-link>
                                        </li>
                                    </el-menu-item>

                                    <el-menu-item index="1-3"
                                        v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')">
                                        <li class="items-center">
                                            <router-link to="/admin/tipo-materiales"
                                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                <i class="fa-solid fa-pump-medical mr-2 text-sm"></i>
                                                Tipos Materiales
                                            </router-link>
                                        </li>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>

                <!-- <div> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Insumos
                    </h6>

                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/inventario"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-boxes-stacked mr-2 text-sm"></i>
                                Inventario
                            </router-link>
                        </li>
                    </ul> -->
                <!-- <ul v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')"
                        class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/materiales"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-recycle mr-2 text-sm"></i>
                                Lista de Insumos / Materiales
                            </router-link>
                        </li>
                        <li class="items-center">
                            <router-link to="/admin/tipo-materiales"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-pump-medical mr-2 text-sm"></i>
                                Lista de Tipos Insumos / Materiales
                            </router-link>
                        </li>
                    </ul> -->
                <!-- </div> -->



                <!-- <div v-if="getmiUsuario.rol != ('Secretaria')"> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Servicios
                    </h6>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center" v-if="getmiUsuario.rol != ('Odontologo')">
                            <router-link to="/admin/servicios/agregar"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-hospital-user mr-2 text-sm text-gray-400"></i>
                                Nuevo Servicio
                            </router-link>
                        </li>
                        <li class="items-center">
                            <router-link to="/admin/servicios"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-solid fa-users mr-2 text-sm text-gray-400"></i>
                                Lista de Servicios
                            </router-link>
                        </li>
                    </ul>
                </div> -->
                <hr class="my-4 md:min-w-full" />

                <div v-if="getmiUsuario.rol != ('Secretaria') && getmiUsuario.rol != ('Odontologo')">
                    <el-row class="tac">
                        <el-col>
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose">
                                <el-submenu index="1">
                                    <template slot="title">
                                        <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                        <span
                                            class="ml-3 md:min-w-full  text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Servicios</span>
                                    </template>

                                    <el-menu-item-group>
                                        <el-menu-item index="1-1">
                                            <li class="items-center">
                                                <router-link to="/admin/servicios/agregar"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-solid fa-hospital-user mr-2 text-sm text-gray-400"></i>
                                                    Nuevo Servicio
                                                </router-link>
                                            </li>
                                        </el-menu-item>

                                        <el-menu-item index="1-2">
                                            <li class="items-center">
                                                <router-link to="/admin/servicios"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-solid fa-users mr-2 text-sm text-gray-400"></i>
                                                    Lista de Servicios
                                                </router-link>
                                            </li>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>

                            </el-menu>
                        </el-col>
                    </el-row>
                </div>



                <!-- <div v-if="getmiUsuario.rol != ('Odontologo') && getmiUsuario.rol != ('Secretaria')"> -->
                <!-- Divider -->
                <!-- <hr class="my-4 md:min-w-full" /> -->
                <!-- Heading -->
                <!-- <h6 class="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Proveedores
                    </h6>
                    <ul class="md:flex-col md:min-w-full flex flex-col list-none">
                        <li class="items-center">
                            <router-link to="/admin/proveedores"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-sharp fa-solid fa-user mr-2 text-sm text-gray-400"></i>
                                Lista de Proveedores
                            </router-link>
                        </li>
                        <li class="items-center">
                            <router-link to="/admin/proveedores/agregar"
                                class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                exact-active-class="text-emerald-500 hover:text-emerald-600">
                                <i class="fa-sharp fa-solid fa-user mr-2 text-sm text-gray-400"></i>
                                Agregar Proveedor
                            </router-link>
                        </li>
                    </ul>
                </div> -->
                <hr class="my-4 md:min-w-full" />

                <div v-if="getmiUsuario.rol != ('Secretaria') && getmiUsuario.rol != ('Odontologo')">
                    <el-row class="tac">
                        <el-col>
                            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose">
                                <el-submenu index="1">
                                    <template slot="title">
                                        <i class="fa-solid fa-cash-register mr-2 text-sm"></i>
                                        <span
                                            class="ml-3 md:min-w-full  text-xs text-black uppercase font-bold pt-1 pb-4 no-underline">Proveedores</span>
                                    </template>

                                    <el-menu-item-group>
                                        <el-menu-item index="1-1">
                                            <li class="items-center">
                                                <router-link to="/admin/proveedores"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-sharp fa-solid fa-user mr-2 text-sm text-gray-400"></i>
                                                    Lista de Proveedores
                                                </router-link>
                                            </li>
                                        </el-menu-item>

                                        <el-menu-item index="1-2">
                                            <li class="items-center">
                                                <router-link to="/admin/proveedores/agregar"
                                                    class="text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                                                    exact-active-class="text-emerald-500 hover:text-emerald-600">
                                                    <i class="fa-sharp fa-solid fa-user mr-2 text-sm text-gray-400"></i>
                                                    Agregar Proveedor
                                                </router-link>
                                            </li>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>

                            </el-menu>
                        </el-col>
                    </el-row>
                </div>

            </div>
        </div>
    </nav>
</template>
<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
export default {
    name: 'side_bar',
    data() {
        return {
            collapseShow: "hidden",
        };
    },
    methods: {
        toggleCollapseShow: function (classes) {
            this.collapseShow = classes;
        },
    },
    components: {
        NotificationDropdown,
        UserDropdown,
    },
    computed: {
        getmiUsuario() {
            return this.$store.getters.getmiUsuario;
        }
    }
};
</script>
<style>
.el-menu {
    border: none
}
</style>
