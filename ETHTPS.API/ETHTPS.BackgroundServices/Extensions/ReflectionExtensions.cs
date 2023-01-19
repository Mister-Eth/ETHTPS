using System;
using System.Reflection;

namespace ETHTPS.Services.Extensions
{
    public static class ReflectionExtensions
    {
        // ##########################################################################################
        // Get / Set Field
        // ##########################################################################################

        #region Get / Set Field

        public static object GetFieldValue(this object obj, string fieldName)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj));
            Type objType = obj.GetType();
            var fieldInfo = GetFieldInfo(objType, fieldName);
            if (fieldInfo == null)
                throw new ArgumentOutOfRangeException(fieldName,
                    $"Couldn't find field {fieldName} in type {objType.FullName}");
            return fieldInfo.GetValue(obj);
        }

        public static void SetFieldValue(this object obj, string fieldName, object val)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj));
            Type objType = obj.GetType();
            var fieldInfo = GetFieldInfo(objType, fieldName);
            if (fieldInfo == null)
                throw new ArgumentOutOfRangeException(fieldName,
                    $"Couldn't find field {fieldName} in type {objType.FullName}");
            fieldInfo.SetValue(obj, val);
        }

        private static FieldInfo GetFieldInfo(Type type, string fieldName)
        {
            FieldInfo fieldInfo = null;
            do
            {
                fieldInfo = type.GetField(fieldName, BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
                type = type.BaseType;
            } while (fieldInfo == null && type != null);

            return fieldInfo;
        }

        #endregion

        // ##########################################################################################
        // Get / Set Property
        // ##########################################################################################

        #region Get / Set Property

        public static object GetPropertyValue(this object obj, string propertyName)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj));
            Type objType = obj.GetType();
            var propertyInfo = GetPropertyInfo(objType, propertyName);
            if (propertyInfo == null)
                throw new ArgumentOutOfRangeException(propertyName,
                    $"Couldn't find property {propertyName} in type {objType.FullName}");
            return propertyInfo.GetValue(obj, null);
        }

        public static void SetPropertyValue(this object obj, string propertyName, object val)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj));
            Type objType = obj.GetType();
            var propertyInfo = GetPropertyInfo(objType, propertyName);
            if (propertyInfo == null)
                throw new ArgumentOutOfRangeException(propertyName,
                    $"Couldn't find property {propertyName} in type {objType.FullName}");
            propertyInfo.SetValue(obj, val, null);
        }

        private static PropertyInfo GetPropertyInfo(Type type, string propertyName)
        {
            PropertyInfo propertyInfo = null;
            do
            {
                propertyInfo = type.GetProperty(propertyName, BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic);
                type = type.BaseType;
            } while (propertyInfo == null && type != null);

            return propertyInfo;
        }

        #endregion
    }
}
