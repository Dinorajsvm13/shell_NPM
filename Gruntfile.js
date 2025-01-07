module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-war');

  var taskConfig = {
    war: {
      options: {
        war_dist_folder: 'dist/war',
      },
      app1: {
        options: {
          war_verbose: true,
          war_dist_folder: 'dist/apps',
          war_name: 'app1',
          webxml_welcome: 'index.html',
          webxml_display_name: 'app1',
          webxml_mime_mapping: [
            {
              extension: 'mjs',
              mime_type: 'application/javascript',
            },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'dist/apps/app1',
            src: ['**'],
            dest: '',
          },
        ],
      },
      app2: {
        options: {
          war_verbose: true,
          war_dist_folder: 'dist/apps',
          war_name: 'app2',
          webxml_welcome: 'index.html',
          webxml_display_name: 'app2',
          webxml_mime_mapping: [
            {
              extension: 'mjs',
              mime_type: 'application/javascript',
            },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'dist/apps/app2',
            src: ['**'],
            dest: '',
          },
        ],
      },
      app3: {
        options: {
          war_verbose: true,
          war_dist_folder: 'dist/apps',
          war_name: 'app3',
          webxml_welcome: 'index.html',
          webxml_display_name: 'app3',
          webxml_mime_mapping: [
            {
              extension: 'mjs',
              mime_type: 'application/javascript',
            },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'dist/apps/app3',
            src: ['**'],
            dest: '',
          },
        ],
      },
      app4: {
        options: {
          war_verbose: true,
          war_dist_folder: 'dist/apps',
          war_name: 'app4',
          webxml_welcome: 'index.html',
          webxml_display_name: 'app4',
          webxml_mime_mapping: [
            {
              extension: 'mjs',
              mime_type: 'application/javascript',
            },
          ],
        },
        files: [
          {
            expand: true,
            cwd: 'dist/apps/app4',
            src: ['**'],
            dest: '',
          },
        ],
      },
      main: {
        options: {
          war_verbose: true,
          war_dist_folder: 'dist/apps',
          war_name: 'shell',
          webxml_welcome: 'index.html',
          webxml_display_name: 'shell',
          webxml_mime_mapping: [
            {
              extension: 'mjs',
              mime_type: 'application/javascript',
            },
          ],
          webxml: function () {
            const xmlContent = `
            <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
             http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
             version="3.1">
              <welcome-file-list>
                  <welcome-file>index.html</welcome-file>
              </welcome-file-list>
              <error-page>
                  <error-code>404</error-code>
                  <location>/index.html</location>
              </error-page>
        <mime-mapping><extension>mjs</extension><mime-type>application/javascript</mime-type></mime-mapping>
              <servlet>
                  <servlet-name>RedirectServlet</servlet-name>
                  <servlet-class>javax.servlet.http.HttpServlet</servlet-class>
              </servlet>
              <servlet-mapping>
                  <servlet-name>RedirectServlet</servlet-name>
                  <url-pattern>/shell</url-pattern>
              </servlet-mapping>
              <servlet-mapping>
                  <servlet-name>RedirectServlet</servlet-name>
                  <url-pattern>/shell/*</url-pattern>
              </servlet-mapping>
            </web-app>
            `;
            return xmlContent;
          },
        },
        files: [
          {
            expand: true,
            cwd: 'dist/apps/shell',
            src: ['**'],
            dest: '',
          },
        ],
      },
    },
  };

  grunt.initConfig(taskConfig);
};
