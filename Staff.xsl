<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
				  table {
				    border: transparent;
						margin: 0 auto;
				  }
				  td, th {
				    
					border: transparent;
				    padding: 0.5rem;
				    text-align: center;
						font-color: #483D8B
				  }
				  th {
				    font-weight: bold;
				  }
			  </style>
							</head>
			<body>
				<table>
					<tr>
						<th>Full Name</th>
						<th>Address</th>
						<th>Gender</th>
						<th>Phone Number</th>
					</tr>
					<xsl:for-each select="staff/member">
							<tr>
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
							</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>