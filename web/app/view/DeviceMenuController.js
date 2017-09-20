/*
 * Copyright 2017 Anton Tananaev (anton@traccar.org)
 * Copyright 2017 Andrey Kunitsyn (andrey@traccar.org)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('Traccar.view.DeviceMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deviceMenu',

    requires: [
        'Traccar.view.permissions.Geofences',
        'Traccar.view.permissions.Drivers',
        'Traccar.view.permissions.Notifications',
        'Traccar.view.edit.ComputedAttributes',
        'Traccar.view.permissions.SavedCommands',
        'Traccar.view.BaseWindow'
    ],

    init: function () {
        this.lookupReference('menuDriversButton').setHidden(
            Traccar.app.getVehicleFeaturesDisabled() || Traccar.app.getBooleanAttributePreference('ui.disableDrivers'));
        this.lookupReference('menuComputedAttributesButton').setHidden(
            Traccar.app.getBooleanAttributePreference('ui.disableComputedAttributes'));
        this.lookupReference('menuCommandsButton').setHidden(Traccar.app.getPreference('limitCommands', false));
    },

    onGeofencesClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedGeofences,
            items: {
                xtype: 'linkGeofencesView',
                baseObjectName: 'deviceId',
                linkObjectName: 'geofenceId',
                storeName: 'Geofences',
                baseObject: this.getView().up('deviceMenu').device.getId()
            }
        }).show();
    },

    onNotificationsClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedNotifications,
            items: {
                xtype: 'linkNotificationsView',
                baseObjectName: 'deviceId',
                linkObjectName: 'notificationId',
                storeName: 'Notifications',
                baseObject: this.getView().up('deviceMenu').device.getId()
            }
        }).show();
    },

    onComputedAttributesClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedComputedAttributes,
            items: {
                xtype: 'linkComputedAttributesView',
                baseObjectName: 'deviceId',
                linkObjectName: 'attributeId',
                storeName: 'ComputedAttributes',
                baseObject: this.getView().up('deviceMenu').device.getId()
            }
        }).show();
    },

    onDriversClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedDrivers,
            items: {
                xtype: 'linkDriversView',
                baseObjectName: 'deviceId',
                linkObjectName: 'driverId',
                storeName: 'Drivers',
                baseObject: this.getView().up('deviceMenu').device.getId()
            }
        }).show();
    },

    onCommandsClick: function () {
        Ext.create('Traccar.view.BaseWindow', {
            title: Strings.sharedSavedCommands,
            items: {
                xtype: 'linkSavedCommandsView',
                baseObjectName: 'deviceId',
                linkObjectName: 'commandId',
                storeName: 'Commands',
                baseObject: this.getView().up('deviceMenu').device.getId()
            }
        }).show();
    }
});