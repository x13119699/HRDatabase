<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
				  table {
				    border: 1px solid black;
						margin: 0 auto;
				  }
				  td, th {
				    
						border: 1px solid white;
				    padding: 0.5rem;
				    text-align: left;
						font-color: #FFFFFF
				  }
				  th {
				    font-weight: bold;
					  font-size: 16px;
					  text-align: left
				  }
					
<!-- 					body{
					background-color:grey
					} -->
			  </style>
							</head>
			<body>
				<table>
					<tr>
						<th>Staff Id</th>
						<th>Full Name</th>
						<th>Address</th>
						<th>Gender</th>
						<th>Phone Number</th>
						<th>Department</th>
					</tr>
					
					
					
					<xsl:for-each select="staff/member">
							<tr>
								
								
								<td>
									<xsl:value-of select="StaffId"/>
								</td>
								
								<td>
									<xsl:value-of select="Full_Name"/>
								</td>
																<td>
									<xsl:value-of select="Address"/>
								</td>
								<td>
									<xsl:value-of select="Gender"/>
								</td>

								<td>
									<xsl:value-of select="Phone_Number"/>
								</td>
								<td>
								<xsl:value-of select="Department"/>
								</td>
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>